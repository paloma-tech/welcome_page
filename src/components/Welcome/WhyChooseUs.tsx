"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const WhyChooseUs = () => {
  const { t } = useLanguage();
  const features = [
    {
      icon: "scale",
      title: t('why.feature1.title'),
      description: t('why.feature1.description')
    },
    {
      icon: "interface",
      title: t('why.feature2.title'),
      description: t('why.feature2.description')
    },
    {
      icon: "security",
      title: t('why.feature3.title'),
      description: t('why.feature3.description')
    },
    {
      icon: "support",
      title: t('why.feature4.title'),
      description: t('why.feature4.description')
    }
  ];

  // Function to render the appropriate icon based on the feature type
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'scale':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="3" x2="12" y2="21"></line>
            <polyline points="18 9 12 3 6 9"></polyline>
            <polyline points="18 15 12 21 6 15"></polyline>
          </svg>
        );
      case 'interface':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        );
      case 'security':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        );
      case 'support':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        );
    }
  };

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-white dark:bg-gray-dark">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-12 lg:mb-20">
          <span className="mb-2 block text-lg font-semibold text-primary">
            {t('why.title')}
          </span>
          <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[40px]">
            {t('why.description')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="wow fadeInUp rounded-md bg-white p-8 shadow-md hover:shadow-lg dark:bg-dark-2"
              data-wow-delay={`.${index + 1}s`}
            >
              <div className="mx-auto mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-md bg-primary bg-opacity-10">
                <span className="text-primary">
                  {renderIcon(feature.icon)}
                </span>
              </div>
              <h3 className="mb-4 text-center text-xl font-bold text-black dark:text-white">
                {feature.title}
              </h3>
              <p className="text-center text-base font-medium text-body-color dark:text-body-color-dark">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;