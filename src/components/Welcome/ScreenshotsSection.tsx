"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

const ScreenshotsSection = () => {
  const { t, language } = useLanguage();

  // Function to get screenshots with translated content
  const getScreenshots = () => [
    {
      id: 1,
      title: t('screenshots.pos.title'),
      description: t('screenshots.pos.description'),
      image: "/images/screenshots/pos.png", // Replace with actual screenshot path
    },
    {
      id: 2,
      title: t('screenshots.dashboard.title'),
      description: t('screenshots.dashboard.description'),
      image: "/images/screenshots/dashboard.png", // Replace with actual screenshot path
    },
    {
      id: 3,
      title: t('screenshots.invoice.title'),
      description: t('screenshots.invoice.description'),
      image: "/images/screenshots/invoice.png", // Screenshot showing invoice interface
    },
    {
      id: 4,
      title: t('screenshots.employee.title'),
      description: t('screenshots.employee.description'),
      image: "/images/screenshots/role.png", // Screenshot showing role permissions
    },
    {
      id: 5,
      title: t('screenshots.printer.title'),
      description: t('screenshots.printer.description'),
      image: "/images/screenshots/printer-settings.png", // Screenshot showing printer configuration
    },
    {
      id: 6,
      title: t('screenshots.kitchen.title'),
      description: t('screenshots.kitchen.description'),
      image: "/images/screenshots/kitchen-printer-settings.png", // Screenshot showing kitchen display system
    },
  ];

  // Get screenshots with current language translations
  const screenshots = getScreenshots();

  // State to track the currently selected screenshot
  const [selectedScreenshot, setSelectedScreenshot] = useState(screenshots[0]);

  // Update selected screenshot when language changes
  useEffect(() => {
    const updatedScreenshots = getScreenshots();
    // Find the screenshot with the same ID as the currently selected one
    const updatedSelectedScreenshot = updatedScreenshots.find(
      (screenshot) => screenshot.id === selectedScreenshot.id
    ) || updatedScreenshots[0];

    setSelectedScreenshot(updatedSelectedScreenshot);
  }, [language]);

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-primary/5 dark:bg-gray-dark">
      <div className="container">
        {/* Section Header */}
        <div className="mx-auto mb-8 max-w-[620px] text-center lg:mb-12">
          <span className="mb-2 block text-lg font-semibold text-primary">
            {t('screenshots.badge')}
          </span>
          <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl md:text-4xl">
            {t('screenshots.title')}
          </h2>
          <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
            {t('screenshots.description')}
          </p>
        </div>

        {/* Main Featured Screenshot */}
        <div className="mb-6 md:mb-10 max-w-5xl mx-auto">
          <div className="wow fadeInUp flex flex-col rounded-lg bg-white shadow-md dark:bg-dark-2 overflow-hidden border-2 border-gray-300 dark:border-gray-600">
            {/* Main Screenshot Image */}
            <div className="relative overflow-hidden rounded-t-lg">
              <div className="w-full h-full bg-gray-200 dark:bg-gray-800">
                <div className="relative w-full" style={{ height: 'auto', aspectRatio: '16/9' }}>
                  <Image
                    src={selectedScreenshot.image}
                    alt={selectedScreenshot.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                </div>
              </div>
            </div>

            {/* Screenshot Description */}
            <div className="px-4 py-3 md:px-5 md:py-4 border-t-2 border-gray-300 dark:border-gray-600">
              <h3 className="mb-1 md:mb-2 text-xl md:text-2xl font-bold text-black dark:text-white">
                {selectedScreenshot.title}
              </h3>
              <p className="text-sm md:text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
                {selectedScreenshot.description}
              </p>
            </div>
          </div>
        </div>

        {/* Thumbnail Gallery - Horizontal scroll on mobile, grid on larger screens */}
        <div className="max-w-4xl mx-auto overflow-visible">
          {/* Mobile horizontal scroll */}
          <div className="md:hidden relative mt-2">
            <div className="overflow-x-auto overflow-y-visible scrollbar-hide pb-3 -mx-4 px-4">
              <div className="flex gap-3 pb-1 pt-1" style={{ width: 'max-content' }}>
                {screenshots.map((screenshot) => (
                  <div
                    key={screenshot.id}
                    className={`flex-none cursor-pointer rounded-md overflow-hidden transition-all duration-300 w-[110px] border border-gray-300 dark:border-gray-600 ${
                      selectedScreenshot.id === screenshot.id
                        ? "ring-2 ring-primary border-primary"
                        : "hover:ring-2 hover:ring-primary/50"
                    }`}
                    onClick={() => setSelectedScreenshot(screenshot)}
                  >
                    {/* Thumbnail Image */}
                    <div className="relative overflow-hidden w-full h-full">
                      <div className="w-full bg-gray-200 dark:bg-gray-800">
                        <div className="relative w-full" style={{ height: 'auto', aspectRatio: '4/3' }}>
                          <Image
                            src={screenshot.image}
                            alt={screenshot.title}
                            fill
                            className="object-cover"
                            sizes="110px"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Optional scroll indicator */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-primary/5 dark:from-gray-dark to-transparent w-12 h-full pointer-events-none md:hidden"></div>
          </div>

          {/* Desktop/tablet grid */}
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {screenshots.map((screenshot) => (
              <div
                key={screenshot.id}
                className={`wow fadeInUp cursor-pointer rounded-md overflow-hidden transition-all duration-300 border-2 border-gray-300 dark:border-gray-600 ${
                  selectedScreenshot.id === screenshot.id
                    ? "ring-3 ring-primary border-primary"
                    : "hover:ring-2 hover:ring-primary/50"
                }`}
                data-wow-delay={`.${screenshot.id % 5}s`}
                onClick={() => setSelectedScreenshot(screenshot)}
              >
                {/* Thumbnail Image */}
                <div className="relative overflow-hidden w-full h-full">
                  <div className="w-full bg-gray-200 dark:bg-gray-800">
                    <div className="relative w-full" style={{ height: 'auto', aspectRatio: '4/3' }}>
                      <Image
                        src={screenshot.image}
                        alt={screenshot.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 33vw, 16vw"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScreenshotsSection;
