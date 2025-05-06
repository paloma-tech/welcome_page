"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const WelcomeERPSolutions = () => {
  const { t } = useLanguage();
  const solutions = [
    {
      icon: "store",
      title: t('erp.solution1.title'),
      description: t('erp.solution1.description')
    },
    {
      icon: "inventory",
      title: t('erp.solution2.title'),
      description: t('erp.solution2.description')
    },
    {
      icon: "employee",
      title: t('erp.solution3.title'),
      description: t('erp.solution3.description')
    },
    {
      icon: "ai",
      title: t('erp.solution4.title'),
      description: t('erp.solution4.description')
    },
    {
      icon: "mobile",
      title: t('erp.solution5.title'),
      description: t('erp.solution5.description')
    },
    {
      icon: "offline",
      title: t('erp.solution6.title'),
      description: t('erp.solution6.description')
    }
  ];

  // Function to render the appropriate icon based on the solution type
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'store':
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        );
      case 'inventory':
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        );
      case 'employee':
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        );
      case 'ai':
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
        );
      case 'mobile':
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
            <line x1="12" y1="18" x2="12.01" y2="18"></line>
          </svg>
        );
      case 'offline':
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="1" y1="1" x2="23" y2="23"></line>
            <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
            <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
            <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
            <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
            <line x1="12" y1="20" x2="12.01" y2="20"></line>
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        );
    }
  };

  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28 bg-gray-50 dark:bg-gray-dark">
      <div className="container">
        <div className="text-center mb-12 lg:mb-20">
          <span className="mb-2 block text-lg font-semibold text-primary">
            {t('erp.badge')}
          </span>
          <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[40px]">
            {t('erp.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="wow fadeInUp rounded-lg bg-white p-8 shadow-md hover:shadow-lg dark:bg-dark-2 flex flex-col items-center text-center"
              data-wow-delay={`.${index + 1}s`}
            >
              <div className="flex flex-col items-center mb-6">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
                  {renderIcon(solution.icon)}
                </div>
                <h3 className="text-xl font-bold text-black dark:text-white">
                  {solution.title}
                </h3>
              </div>
              <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WelcomeERPSolutions;