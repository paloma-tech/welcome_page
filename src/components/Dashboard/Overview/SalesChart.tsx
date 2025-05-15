"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { SalesChartData } from "@/lib/dashboard";
import { formatCurrency } from "@/lib/utils";
import { useLanguage } from "../../../contexts/LanguageContext";

interface SalesChartProps {
  data?: SalesChartData;
  isLoading?: boolean;
}

export default function SalesChart({ data, isLoading = false }: SalesChartProps) {
  const [view, setView] = useState("daily");
  const { t } = useLanguage();

  const getChartData = () => {
    if (!data) return [];

    switch (view) {
      case "daily":
        return data.daily;
      case "weekly":
        return data.weekly;
      case "monthly":
        return data.monthly;
      default:
        return data.daily;
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-primary/20 rounded-md shadow-md p-3 text-xs">
          <p className="font-medium text-foreground mb-1">{label}</p>
          <p className="text-primary font-bold">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-[180px] mb-1" />
          <Skeleton className="h-4 w-[150px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>{t('dashboard.charts.sales.title')}</CardTitle>
          <CardDescription>{t('dashboard.error.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-[200px]">
          <div className="text-red-500 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            {t('dashboard.error.subtitle')}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle>{t('dashboard.charts.sales.title')}</CardTitle>
            <CardDescription>{t('dashboard.charts.sales.subtitle')}</CardDescription>
          </div>
          <Tabs value={view} onValueChange={setView} className="w-auto">
            <div className="overflow-x-auto -mr-2 pr-2">
              <TabsList className="flex min-w-[200px] h-8 bg-muted/50 p-1 rounded-lg">
                <TabsTrigger value="daily" className="flex-1 text-xs px-2 py-1">
                  <span className="block truncate">{t('dashboard.charts.sales.daily')}</span>
                </TabsTrigger>
                <TabsTrigger value="weekly" className="flex-1 text-xs px-2 py-1">
                  <span className="block truncate">{t('dashboard.charts.sales.weekly')}</span>
                </TabsTrigger>
                <TabsTrigger value="monthly" className="flex-1 text-xs px-2 py-1">
                  <span className="block truncate">{t('dashboard.charts.sales.monthly')}</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] sm:h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={getChartData()}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4A6CF7" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4A6CF7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#888' }}
                dy={5}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#888' }}
                tickFormatter={(value) => `${value / 1000}k`}
                dx={-5}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#4A6CF7"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSales)"
                activeDot={{ r: 6, strokeWidth: 0, fill: "#4A6CF7" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
