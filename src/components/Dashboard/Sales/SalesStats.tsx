"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatPercentage, getGrowthIndicator } from "@/lib/utils";
import { DollarSign, TrendingUp, TrendingDown, Calendar, Clock, CalendarDays } from "lucide-react";
import { useLanguage } from "../../../contexts/LanguageContext";

interface SalesStatsProps {
  data?: {
    total: number;
    today: number;
    weekly: number;
    monthly: number;
    growth: number;
  };
  isLoading?: boolean;
}

export default function SalesStats({ data, isLoading = false }: SalesStatsProps) {
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
      value: formatCurrency(data.total),
      icon: DollarSign,
      description: `${formatPercentage(data.growth)} ${data.growth >= 0 ? t('dashboard.stats.salesGrowth.positive') : t('dashboard.stats.salesGrowth.negative')}`,
      trend: getGrowthIndicator(data.growth),
    },
    {
      title: t('dashboard.stats.todaySales.title'),
      value: formatCurrency(data.today),
      icon: Clock,
      description: t('dashboard.stats.todaySales.description'),
      trend: "neutral",
    },
    {
      title: t('dashboard.stats.weeklySales.title'),
      value: formatCurrency(data.weekly),
      icon: Calendar,
      description: t('dashboard.stats.weeklySales.description'),
      trend: "neutral",
    },
    {
      title: t('dashboard.stats.monthlySales.title'),
      value: formatCurrency(data.monthly),
      icon: CalendarDays,
      description: t('dashboard.stats.monthlySales.description'),
      trend: "neutral",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">
              <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              {stat.trend === "positive" && (
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              )}
              {stat.trend === "negative" && (
                <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
              )}
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
