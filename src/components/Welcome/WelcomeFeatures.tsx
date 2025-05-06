"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const WelcomeFeatures = () => {
  const { t } = useLanguage();
  return (
    <section className="py-16 md:py-20 lg:py-28 bg-white dark:bg-gray-dark">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* POS Feature Card */}
          <div className="wow fadeInUp rounded-lg bg-primary/[.03] p-8 shadow-md hover:shadow-lg dark:bg-dark sm:p-10 lg:p-12 xl:p-8 flex flex-col items-center text-center" data-wow-delay=".1s">
            <div className="flex h-16 w-16 items-center justify-center rounded-md bg-primary text-white mb-8">
              <svg
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Network POS Icon - mimicking mdi-network-pos */}
                <rect x="2" y="2" width="20" height="8" rx="1"></rect>
                <rect x="2" y="14" width="8" height="8" rx="1"></rect>
                <rect x="14" y="14" width="8" height="8" rx="1"></rect>
                <line x1="6" y1="6" x2="18" y2="6"></line>
                <line x1="6" y1="18" x2="6" y2="18.01"></line>
                <line x1="18" y1="18" x2="18" y2="18.01"></line>
              </svg>
            </div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">{t('features.pos.title')}</h3>
            <p className="text-base font-medium text-body-color dark:text-body-color-dark">
              {t('features.pos.description')}
            </p>
          </div>

          {/* Cloud-Based ERP Feature Card */}
          <div className="wow fadeInUp rounded-lg bg-primary/[.03] p-8 shadow-md hover:shadow-lg dark:bg-dark sm:p-10 lg:p-12 xl:p-8 flex flex-col items-center text-center" data-wow-delay=".15s">
            <div className="flex h-16 w-16 items-center justify-center rounded-md bg-primary text-white mb-8">
              <svg
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 17l4-4 4 4"></path>
                <path d="M12 12v9"></path>
                <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"></path>
              </svg>
            </div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">{t('features.erp.title')}</h3>
            <p className="text-base font-medium text-body-color dark:text-body-color-dark">
              {t('features.erp.description')}
            </p>
          </div>

          {/* Analytics Feature Card */}
          <div className="wow fadeInUp rounded-lg bg-primary/[.03] p-8 shadow-md hover:shadow-lg dark:bg-dark sm:p-10 lg:p-12 xl:p-8 flex flex-col items-center text-center" data-wow-delay=".2s">
            <div className="flex h-16 w-16 items-center justify-center rounded-md bg-primary text-white mb-8">
              <svg
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="20" x2="12" y2="10"></line>
                <line x1="18" y1="20" x2="18" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="16"></line>
              </svg>
            </div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">{t('features.cloud.title')}</h3>
            <p className="text-base font-medium text-body-color dark:text-body-color-dark">
              {t('features.cloud.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeFeatures;