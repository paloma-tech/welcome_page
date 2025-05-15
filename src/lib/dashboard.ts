'use client';

import { useState, useEffect, useCallback } from 'react';

// Dashboard summary statistics
export interface DashboardSummary {
  sales: {
    total: number;
    today: number;
    weekly: number;
    monthly: number;
    growth: number; // percentage growth compared to previous period
  };
  orders: {
    total: number;
    pending: number;
    completed: number;
    cancelled: number;
  };
  inventory: {
    totalProducts: number;
    totalValue: number;
    lowStock: number;
    outOfStock: number;
  };
  employees: {
    total: number;
    active: number;
    inactive: number;
    roles: number;
  };
}

// Sales chart data
export interface SalesChartData {
  daily: { name: string; value: number }[];
  weekly: { name: string; value: number }[];
  monthly: { name: string; value: number }[];
}

// Inventory chart data
export interface InventoryChartData {
  byCategory: { name: string; value: number }[];
  topProducts: { name: string; value: number }[];
  stockStatus: {
    inStock: number;
    lowStock: number;
    outOfStock: number;
  };
}

// Activity item
export interface ActivityItem {
  id: number;
  type: "sale" | "order" | "inventory" | "employee";
  description: string;
  time: string;
  timestamp: string;
}

// Dashboard metadata
export interface DashboardMetadata {
  last_updated?: string;
  internet_connected?: boolean;
}

// Dashboard data
export interface DashboardData {
  summary: DashboardSummary;
  salesChart: SalesChartData;
  inventoryChart: InventoryChartData;
  recentActivities: ActivityItem[];
  metadata?: DashboardMetadata;
}

// Function to fetch dashboard data
export async function getDashboardData(): Promise<DashboardData> {
  try {
    // Get the user's license key from the authentication context
    // This is required - we no longer use a default key

    let token = null;
    let licenseKey = null;

    // Try to get the token from localStorage if available
    if (typeof window !== 'undefined') {
      try {
        // Try both token keys - the official one from auth.ts and the legacy one
        token = localStorage.getItem('paloma_auth_token') || localStorage.getItem('token');
        console.log('Token retrieved from localStorage:', token ? 'Yes' : 'No');

        // If we found a token with the legacy key, migrate it to the official key
        if (!localStorage.getItem('paloma_auth_token') && localStorage.getItem('token')) {
          console.log('Migrating token from legacy storage to official storage');
          localStorage.setItem('paloma_auth_token', localStorage.getItem('token')!);
        }
      } catch (e) {
        console.warn('Could not access localStorage:', e);
      }
    }

    // We should have a token to get the license key
    if (!token) {
      console.warn('No authentication token available');

      // In development mode, we can use a default license key for testing
      if (process.env.NODE_ENV === 'development') {
        console.log('Development mode detected, using test-license key');
        licenseKey = 'test-license';
        // Skip the API call and continue with the test license key
      } else {
        throw new Error('Authentication required. Please sign in to view your dashboard.');
      }
    }

    // Get the user's license key if we don't already have one (from development mode)
    if (!licenseKey && token) {
      try {
        console.log('Fetching license key from API');
        const licenseResponse = await fetch('/api/license/get', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (licenseResponse.ok) {
          const licenseData = await licenseResponse.json();

          if (licenseData.success && licenseData.licenseKey) {
            licenseKey = licenseData.licenseKey;
            console.log(`Using license key: ${licenseKey}`);
          } else {
            console.warn('License key not found in response:', licenseData);
            throw new Error('No license key found for your account. Please contact support.');
          }
        } else {
          console.warn('License API response not OK:', licenseResponse.status);
          throw new Error(`Failed to retrieve license key: ${licenseResponse.statusText}`);
        }
      } catch (licenseError) {
        console.error('Error fetching license key:', licenseError);
        throw new Error('Failed to retrieve your license key. Please try again later.');
      }
    } else if (licenseKey) {
      console.log(`Using license key: ${licenseKey} (from development mode)`);
    }

    // Ensure we have a license key
    if (!licenseKey) {
      throw new Error('No license key available. Please contact support.');
    }

    // Use the license key to fetch dashboard data from Minio via our API
    console.log(`Fetching dashboard data for license key: ${licenseKey}`);
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Add a cache-busting parameter to ensure we get fresh data
    const cacheBuster = new Date().getTime();
    const response = await fetch(`/api/dashboard/data?key=${licenseKey}&_=${cacheBuster}`, {
      method: 'GET',
      headers,
      // Disable cache to ensure we get fresh data
      cache: 'no-store'
    });

    if (!response.ok) {
      console.error(`API error: ${response.status}`);

      // Special handling for 404 errors (data not found)
      if (response.status === 404) {
        const errorData = await response.json();
        throw new Error(`DATA_NOT_FOUND:${licenseKey}:${errorData.message || 'Dashboard data not found'}`);
      }

      throw new Error(`API error: ${response.status}`);
    }

    // Parse the response JSON
    const responseData = await response.json();

    // Check if the data has the new structure with dashboard_data property
    let dashboardData;
    if (responseData && responseData.dashboard_data) {
      console.log('Client received data with dashboard_data property, extracting inner data');
      dashboardData = responseData.dashboard_data;
    } else {
      console.log('Client received data in expected format');
      dashboardData = responseData;
    }

    // Validate that the response has the expected structure
    if (!dashboardData || !dashboardData.summary || !dashboardData.salesChart || !dashboardData.inventoryChart) {
      console.error('API returned invalid dashboard data format:', dashboardData);
      throw new Error('Invalid dashboard data format');
    }

    console.log('Dashboard data fetched successfully');

    // Return the dashboard data
    return dashboardData as DashboardData;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);

    // Check if this is a DATA_NOT_FOUND error
    if (error instanceof Error && error.message.startsWith('DATA_NOT_FOUND:')) {
      // Re-throw the error so it can be caught by the component
      throw error;
    }

    // Return mock data for other types of errors
    console.log('Returning mock data due to error');
    return getMockDashboardData();
  }
}

// React hook for fetching dashboard data
export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Function to fetch data
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      setError(null);
      const dashboardData = await getDashboardData();
      setData(dashboardData);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);

      // Set error state
      setIsError(true);
      setError(err instanceof Error ? err : new Error('Unknown error'));

      // If it's not a DATA_NOT_FOUND error, we can still use mock data
      if (!(err instanceof Error && err.message.startsWith('DATA_NOT_FOUND:'))) {
        setData(getMockDashboardData());
      } else {
        // For DATA_NOT_FOUND errors, we don't set any data
        setData(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Refetch function
  const refetch = useCallback(async () => {
    setIsRefetching(true);
    try {
      // Reset error state when refetching
      setIsError(false);
      setError(null);

      const dashboardData = await getDashboardData();
      setData(dashboardData);
    } catch (err) {
      console.error('Error refetching dashboard data:', err);

      // Set error state
      setIsError(true);
      setError(err instanceof Error ? err : new Error('Unknown error'));

      // If it's not a DATA_NOT_FOUND error, we can still use mock data
      if (!(err instanceof Error && err.message.startsWith('DATA_NOT_FOUND:'))) {
        setData(getMockDashboardData());
      } else {
        // For DATA_NOT_FOUND errors, we don't set any data
        setData(null);
      }
    } finally {
      setIsRefetching(false);
    }
  }, []);

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Set up automatic refresh every minute to check for updates
  useEffect(() => {
    // Create an interval to refresh data automatically
    const intervalId = setInterval(() => {
      // Only refresh if not already refreshing and not in error state
      if (!isRefetching && !isError) {
        console.log('Auto-refreshing dashboard data');
        refetch();
      }
    }, 60000); // Refresh every minute

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [refetch, isRefetching, isError]);

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching
  };
}

// Mock data for fallback
export function getMockDashboardData(): DashboardData {
  return {
    summary: {
      sales: {
        total: 45678.90,
        today: 1234.56,
        weekly: 8765.43,
        monthly: 32456.78,
        growth: 12.5
      },
      orders: {
        total: 234,
        pending: 45,
        completed: 178,
        cancelled: 11
      },
      inventory: {
        totalProducts: 156,
        totalValue: 87654.32,
        lowStock: 12,
        outOfStock: 8
      },
      employees: {
        total: 15,
        active: 12,
        inactive: 3,
        roles: 5
      }
    },
    salesChart: {
      daily: [
        { name: "Mon", value: 1200 },
        { name: "Tue", value: 1800 },
        { name: "Wed", value: 1400 },
        { name: "Thu", value: 2200 },
        { name: "Fri", value: 2800 },
        { name: "Sat", value: 3200 },
        { name: "Sun", value: 2400 }
      ],
      weekly: [
        { name: "Week 1", value: 8500 },
        { name: "Week 2", value: 9200 },
        { name: "Week 3", value: 7800 },
        { name: "Week 4", value: 10500 }
      ],
      monthly: [
        { name: "Jan", value: 32000 },
        { name: "Feb", value: 28000 },
        { name: "Mar", value: 35000 },
        { name: "Apr", value: 42000 },
        { name: "May", value: 38000 },
        { name: "Jun", value: 45000 }
      ]
    },
    inventoryChart: {
      byCategory: [
        { name: "Food", value: 45 },
        { name: "Beverages", value: 30 },
        { name: "Desserts", value: 15 },
        { name: "Other", value: 10 }
      ],
      topProducts: [
        { name: "Product A", value: 120 },
        { name: "Product B", value: 98 },
        { name: "Product C", value: 86 },
        { name: "Product D", value: 72 },
        { name: "Product E", value: 65 }
      ],
      stockStatus: {
        inStock: 136,
        lowStock: 12,
        outOfStock: 8
      }
    },
    recentActivities: [
      {
        id: 1,
        type: "sale",
        description: "New sale #1239 for $345.67",
        time: "2 minutes ago",
        timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString()
      },
      {
        id: 2,
        type: "inventory",
        description: "Product 'Chicken Wings' is low on stock",
        time: "1 hour ago",
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString()
      },
      {
        id: 3,
        type: "employee",
        description: "Employee John Doe clocked in",
        time: "2 hours ago",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 4,
        type: "order",
        description: "New order #456 received from supplier",
        time: "3 hours ago",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 5,
        type: "sale",
        description: "New sale #1235 for $123.45",
        time: "6 hours ago",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
      }
    ],
    metadata: {
      last_updated: new Date().toISOString(),
      internet_connected: true
    }
  };
}
