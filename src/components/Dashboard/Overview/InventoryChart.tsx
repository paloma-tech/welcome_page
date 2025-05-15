"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { InventoryChartData } from "@/lib/dashboard";
import { useLanguage } from "../../../contexts/LanguageContext";

interface InventoryChartProps {
  data?: InventoryChartData;
  isLoading?: boolean;
}

export default function InventoryChart({ data, isLoading = false }: InventoryChartProps) {
  const [view, setView] = useState("byCategory");
  const { t } = useLanguage();

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md shadow-sm p-2 text-xs">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-primary">{payload[0].value}</p>
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
          <CardTitle>{t('dashboard.charts.inventory.title')}</CardTitle>
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
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{t('dashboard.charts.inventory.title')}</CardTitle>
            <CardDescription>{t('dashboard.charts.inventory.subtitle')}</CardDescription>
          </div>
          <Tabs value={view} onValueChange={setView} className="w-auto">
            <TabsList className="grid grid-cols-2 h-8">
              <TabsTrigger value="byCategory" className="text-xs px-2">{t('dashboard.charts.inventory.byCategory')}</TabsTrigger>
              <TabsTrigger value="stockStatus" className="text-xs px-2">{t('dashboard.charts.inventory.stockStatus')}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          {view === "byCategory" ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.byCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {data.byCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: t('dashboard.stats.totalProducts.title'), value: data.stockStatus.inStock, color: "#10b981" },
                  { name: t('dashboard.stats.lowStock.title'), value: data.stockStatus.lowStock, color: "#f59e0b" },
                  { name: t('dashboard.stats.outOfStock.title'), value: data.stockStatus.outOfStock, color: "#ef4444" },
                ]}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {[
                    { name: t('dashboard.stats.totalProducts.title'), value: data.stockStatus.inStock, color: "#10b981" },
                    { name: t('dashboard.stats.lowStock.title'), value: data.stockStatus.lowStock, color: "#f59e0b" },
                    { name: t('dashboard.stats.outOfStock.title'), value: data.stockStatus.outOfStock, color: "#ef4444" },
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
