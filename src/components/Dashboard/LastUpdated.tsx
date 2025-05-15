'use client';

import { DashboardMetadata } from '@/lib/dashboard';
import { formatDistanceToNow } from 'date-fns';
import { RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useEffect, useState } from 'react';

interface LastUpdatedProps {
  metadata?: DashboardMetadata;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function LastUpdated({ metadata, onRefresh, isRefreshing = false }: LastUpdatedProps) {
  const { t } = useLanguage();
  const [isOnline, setIsOnline] = useState<boolean>(true);

  // Format the last updated time
  let formattedTime = t('dashboard.lastUpdated.unknown');
  let lastUpdatedDate: Date | null = null;

  if (metadata && metadata.last_updated) {
    try {
      lastUpdatedDate = new Date(metadata.last_updated);
      formattedTime = formatDistanceToNow(lastUpdatedDate, { addSuffix: true });
    } catch (error) {
      console.error('Error formatting date:', error);
    }
  }

  // Check if the last_updated timestamp is more than 3 minutes old
  useEffect(() => {
    if (metadata && metadata.last_updated && lastUpdatedDate) {
      const checkConnectionStatus = () => {
        const now = new Date();
        const threeMinutesInMs = 3 * 60 * 1000;
        const timeDifference = now.getTime() - lastUpdatedDate.getTime();

        // If the last update was more than 3 minutes ago, set status to offline
        setIsOnline(timeDifference <= threeMinutesInMs);
      };

      // Check immediately
      checkConnectionStatus();

      // Set up an interval to check every 30 seconds
      const intervalId = setInterval(checkConnectionStatus, 30000);

      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [metadata, metadata?.last_updated, lastUpdatedDate]);

  if (!metadata || !metadata.last_updated) {
    return null;
  }

  return (
    <div className="flex flex-col xs:flex-row xs:items-center justify-between text-xs sm:text-sm text-muted-foreground mb-4 gap-2 xs:gap-4 bg-muted/20 p-2 sm:p-3 rounded-lg border border-stroke/10">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-card px-2 py-1 rounded-md border border-stroke/10"
          title={isOnline ? t('dashboard.lastUpdated.onlineTitle') : t('dashboard.lastUpdated.offlineTitle')}>
          {isOnline ? (
            <Wifi className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
          ) : (
            <WifiOff className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
          )}
          <span className="font-medium">{isOnline ? t('dashboard.lastUpdated.online') : t('dashboard.lastUpdated.offline')}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-card px-2 py-1 rounded-md border border-stroke/10"
        title={`${t('dashboard.lastUpdated.lastUpdatedTitle')}: ${metadata.last_updated}`}>
        <span className="font-medium">{t('dashboard.lastUpdated.lastUpdatedLabel')}: {formattedTime}</span>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="p-1 rounded-full hover:bg-primary/10 transition-colors"
            disabled={isRefreshing}
            title={t('dashboard.lastUpdated.refreshTitle')}
          >
            <RefreshCw
              className={`h-3 w-3 sm:h-4 sm:w-4 ${isRefreshing ? 'animate-spin text-primary' : ''}`}
            />
          </button>
        )}
      </div>
    </div>
  );
}
