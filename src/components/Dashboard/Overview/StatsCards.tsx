'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardSummary } from "@/lib/dashboard";
import { formatCurrency, formatNumber, formatPercentage, getGrowthIndicator } from "@/lib/utils";
import { DollarSign, ShoppingCart, Users, Package, TrendingUp, TrendingDown } from "lucide-react";
import { useLanguage } from "../../../contexts/LanguageContext";

interface StatsCardsProps {
  data?: DashboardSummary;
  isLoading?: boolean;
}

export default function StatsCards({ data, isLoading = false }: StatsCardsProps) {
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <Skeleton className="h-5 w-[120px]" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-[100px] mb-2" />
                <Skeleton className="h-4 w-[180px]" />
              </CardContent>
            </Card>
          ))}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 text-center">
        <div className="mb-4 text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">{t('dashboard.error.title')}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t('dashboard.error.subtitle')}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {t('dashboard.error.refresh.button')}
        </button>
      </div>
    );
  }

  const stats = [
    {
      title: t('dashboard.stats.totalSales.title'),
      value: formatCurrency(data.sales.total),
      icon: DollarSign,
      description: `${formatPercentage(data.sales.growth)} ${data.sales.growth >= 0 ? t('dashboard.stats.salesGrowth.positive') : t('dashboard.stats.salesGrowth.negative')}`,
      trend: getGrowthIndicator(data.sales.growth),
    },
    {
      title: t('dashboard.stats.totalOrders.title'),
      value: formatNumber(data.orders.total),
      icon: ShoppingCart,
      description: `${data.orders.pending} ${t('dashboard.stats.pendingOrders.title').toLowerCase()}, ${data.orders.completed} ${t('dashboard.stats.completedOrders.title').toLowerCase()}`,
      trend: "neutral",
    },
    {
      title: t('dashboard.stats.activeEmployees.title'),
      value: formatNumber(data.employees.active),
      icon: Users,
      description: `${data.employees.total} ${t('dashboard.stats.totalEmployees.title').toLowerCase()}, ${data.employees.roles} ${t('dashboard.stats.totalRoles.title').toLowerCase()}`,
      trend: "neutral",
    },
    {
      title: t('dashboard.stats.lowStock.title'),
      value: formatNumber(data.inventory.lowStock),
      icon: Package,
      description: `${data.inventory.outOfStock} ${t('dashboard.stats.outOfStock.title').toLowerCase()}`,
      trend: data.inventory.lowStock > 10 ? "negative" : "neutral",
    },
  ];

  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 xs:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden border-l-4 hover:translate-y-[-2px] transition-all duration-300"
          style={{ borderLeftColor:
            stat.trend === "positive" ? "rgb(34, 197, 94)" :
            stat.trend === "negative" ? "rgb(239, 68, 68)" :
            "rgb(99, 102, 241)"
          }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-2">
              {stat.trend === "positive" && (
                <span className="flex items-center justify-center mr-1 h-5 w-5 rounded-full bg-green-100 text-green-600">
                  <TrendingUp className="h-3 w-3" />
                </span>
              )}
              {stat.trend === "negative" && (
                <span className="flex items-center justify-center mr-1 h-5 w-5 rounded-full bg-red-100 text-red-600">
                  <TrendingDown className="h-3 w-3" />
                </span>
              )}
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
