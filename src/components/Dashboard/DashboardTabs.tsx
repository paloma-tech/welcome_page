'use client';

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsCards from "./Overview/StatsCards";
import SalesChart from "./Overview/SalesChart";
import InventoryChart from "./Overview/InventoryChart";
import SalesStats from "./Sales/SalesStats";
import OrdersStats from "./Sales/OrdersStats";
import InventoryStats from "./Inventory/InventoryStats";
import EmployeesStats from "./Employees/EmployeesStats";
import { LastUpdated } from "./LastUpdated";
import { useDashboardData } from "@/lib/dashboard";
import { useLanguage } from "../../contexts/LanguageContext";

export default function DashboardTabs() {
  const [activeTab, setActiveTab] = useState("overview");
  const { data: dashboardData, refetch, isRefetching, isError, error } = useDashboardData();
  const { t } = useLanguage();

  const handleRefresh = () => {
    refetch();
  };

  // Check if the error is a "data not found" error
  const isDataNotFoundError = isError && error?.message?.startsWith('DATA_NOT_FOUND:');

  // Extract license key from error message if it's a data not found error
  const licenseKey = isDataNotFoundError
    ? error?.message.split(':')[1] || 'unknown'
    : '';

  // If data not found error, show the special error component
  if (isDataNotFoundError) {
    // Show a user-friendly error page when data is not found
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-gradient-to-br from-red-50 to-red-50/50 border border-red-200 rounded-lg p-6 shadow-lg relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-100/50 rounded-bl-full transform -translate-y-1/3 translate-x-1/3 -z-10"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-100/30 rounded-tr-full transform translate-y-1/3 -translate-x-1/3 -z-10"></div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-red-700 mb-1">{t('dashboard.error.title')}</h2>
              <p className="text-red-600/80 text-sm sm:text-base">{t('dashboard.error.subtitle')}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-amber-50/70 p-4 rounded-lg border border-amber-200 mb-6">
            <h3 className="font-medium text-amber-800 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t('dashboard.error.whatHappened.title')}
            </h3>
            <p className="text-amber-700">
              {t('dashboard.error.whatHappened.description')} <span className="font-mono bg-amber-100 px-2 py-1 rounded-md border border-amber-200">{licenseKey}</span> {t('dashboard.error.whatHappened.suffix')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <button
              onClick={handleRefresh}
              disabled={isRefetching}
              className="inline-flex items-center justify-center px-4 py-2 border border-blue-300 text-blue-700 bg-gradient-to-r from-blue-50 to-blue-100/70 rounded-lg hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isRefetching ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('dashboard.error.refresh.refreshing')}
                </>
              ) : (
                <>
                  <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {t('dashboard.error.refresh.button')}
                </>
              )}
            </button>

            <a
              href={`mailto:contact@paloma.tn?subject=${encodeURIComponent(t('dashboard.error.contact.emailSubject'))}&body=${encodeURIComponent(t('dashboard.error.contact.emailBody').replace('{licenseKey}', licenseKey))}`}
              className="inline-flex items-center justify-center px-4 py-2 border border-green-300 text-green-700 bg-gradient-to-r from-green-50 to-green-100/70 rounded-lg hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {t('dashboard.error.contact.emailButton')}
            </a>
          </div>

          <div className="bg-white/80 rounded-lg p-4 border border-gray-200 shadow-sm">
            <p className="text-gray-700 font-medium mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {t('dashboard.error.support.title')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
              <a href="mailto:contact@paloma.tn" className="flex items-center text-primary hover:underline px-3 py-2 bg-primary/5 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                contact@paloma.tn
              </a>
              <a href="tel:+21692530875" className="flex items-center text-primary hover:underline px-3 py-2 bg-primary/5 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +216 92 530 875
              </a>
              <a href="tel:+21690656399" className="flex items-center text-primary hover:underline px-3 py-2 bg-primary/5 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +216 90 656 399
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 overflow-y-auto">
        {/* Background decorative elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-bl-full transform -translate-y-1/4 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-primary/5 rounded-tr-full transform translate-y-1/4 -translate-x-1/4"></div>
          <div className="absolute top-1/2 left-1/2 w-1/3 h-1/3 bg-yellow/5 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Last Updated Information */}
        {dashboardData?.metadata && (
          <LastUpdated
            metadata={dashboardData.metadata}
            onRefresh={handleRefresh}
            isRefreshing={isRefetching}
          />
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="overflow-x-auto pb-2 -mx-3 px-3">
            <TabsList className="flex w-full sm:grid sm:grid-cols-4 mb-4 sm:mb-6 gap-1 p-1 bg-muted/50 rounded-lg min-w-[300px]">
              <TabsTrigger value="overview" className="flex-1 text-xs sm:text-sm font-medium py-1.5 h-auto">
                <span className="block truncate">{t('dashboard.tabs.overview')}</span>
              </TabsTrigger>
              <TabsTrigger value="sales" className="flex-1 text-xs sm:text-sm font-medium py-1.5 h-auto">
                <span className="block truncate">{t('dashboard.tabs.sales')}</span>
              </TabsTrigger>
              <TabsTrigger value="inventory" className="flex-1 text-xs sm:text-sm font-medium py-1.5 h-auto">
                <span className="block truncate">{t('dashboard.tabs.inventory')}</span>
              </TabsTrigger>
              <TabsTrigger value="employees" className="flex-1 text-xs sm:text-sm font-medium py-1.5 h-auto">
                <span className="block truncate">{t('dashboard.tabs.employees')}</span>
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="overview">
            <div className="space-y-6">
              <StatsCards
                data={dashboardData?.summary}
                isLoading={!dashboardData && !isError}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SalesChart
                  data={dashboardData?.salesChart}
                  isLoading={!dashboardData && !isError}
                />
                <InventoryChart
                  data={dashboardData?.inventoryChart}
                  isLoading={!dashboardData && !isError}
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="sales">
            <div className="space-y-6">
              <SalesStats
                data={dashboardData?.summary?.sales}
                isLoading={!dashboardData && !isError}
              />
              <OrdersStats
                data={dashboardData?.summary?.orders}
                isLoading={!dashboardData && !isError}
              />
            </div>
          </TabsContent>
          <TabsContent value="inventory">
            <div className="space-y-6">
              <InventoryStats
                data={dashboardData?.summary?.inventory}
                isLoading={!dashboardData && !isError}
              />
            </div>
          </TabsContent>
          <TabsContent value="employees">
            <div className="space-y-6">
              <EmployeesStats
                data={dashboardData?.summary?.employees}
                isLoading={!dashboardData && !isError}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
