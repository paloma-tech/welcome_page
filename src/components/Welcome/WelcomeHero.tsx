"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

const WelcomeHero = () => {
  const { t } = useLanguage();
  return (
    <section className="relative z-10 overflow-hidden bg-gradient-to-b from-primary/5 to-white dark:from-gray-dark dark:to-gray-dark/80 pb-16 pt-[120px] dark:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px]">
      {/* Shape SVG Top Right */}
      <div className="absolute top-0 right-0 z-[-1] opacity-30 lg:opacity-70">
        <Image
          src="/images/hero/shape-01.svg"
          alt="Shape"
          width={450}
          height={556}
          className="max-w-full"
        />
      </div>

      <div className="container">
        <div className="flex flex-wrap items-center">
          {/* Hero Content */}
          <div className="w-full px-4 lg:w-1/2">
            <div className="mx-auto max-w-[600px] lg:mx-0">
              <span className="mb-5 inline-block rounded-md bg-primary/10 px-4 py-1 text-primary dark:bg-primary/20">
                {t('hero.badge')}
              </span>
              <h1 className="mb-6 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                {t('hero.title')}
              </h1>
              <p className="mb-8 text-base leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl max-w-[500px]">
                {t('hero.description')}
              </p>

              {/* Feature highlights */}
              <div className="mb-8 grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="mr-3 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-sm md:text-base font-medium text-body-color dark:text-body-color-dark">
                    {t('hero.feature1')}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-sm md:text-base font-medium text-body-color dark:text-body-color-dark">
                    {t('hero.feature2')}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-sm md:text-base font-medium text-body-color dark:text-body-color-dark">
                    {t('hero.feature4')}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-sm md:text-base font-medium text-body-color dark:text-body-color-dark">
                    {t('hero.feature3')}
                  </p>
                </div>
              </div>

              {/* Mobile-responsive button container */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6">
                <Link
                  href="/signup"
                  className="rounded-md bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/90 w-full sm:w-auto text-center"
                >
                  {t('hero.cta.startnow')}
                </Link>
                <Link
                  href="/contact"
                  className="rounded-md bg-black/10 px-8 py-4 text-base font-semibold text-black dark:text-white duration-300 ease-in-out hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 w-full sm:w-auto text-center"
                >
                  {t('hero.cta.learn')}
                </Link>
              </div>


            </div>
          </div>

          {/* Hero Image - Only visible on larger screens */}
          <div className="hidden lg:block w-full px-4 lg:w-1/2">
            <div className="relative z-10 mx-auto max-w-[600px] pt-8">
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full z-[-1] animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-primary/20 rounded-full z-[-1]"></div>

              {/* Decorative dots pattern */}
              <div className="absolute top-1/2 -translate-y-1/2 -right-12 z-[-1] hidden xl:block">
                <div className="flex flex-col gap-2">
                  {[...Array(5)].map((_, rowIndex) => (
                    <div key={`dots-row-${rowIndex}`} className="flex gap-2">
                      {[...Array(5)].map((_, colIndex) => (
                        <div
                          key={`dot-${rowIndex}-${colIndex}`}
                          className={`w-2 h-2 rounded-full ${
                            (rowIndex + colIndex) % 2 === 0
                              ? 'bg-primary/30'
                              : 'bg-primary/10'
                          }`}
                        ></div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced image container */}
              <div className="relative overflow-hidden rounded-xl bg-white p-6 shadow-[0_5px_30px_rgba(74,108,247,0.15)] dark:bg-dark-2 dark:shadow-[0_5px_30px_rgba(0,0,0,0.2)] border border-primary/10 dark:border-primary/5 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(74,108,247,0.25)] dark:hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
                {/* Image label */}
                <div className="absolute top-4 left-4 z-20 bg-primary/90 text-white text-sm px-3 py-1 rounded-md font-medium">
                  {t('hero.dashboard.label')}
                </div>

                {/* Image container with gradient overlay */}
                <div className="aspect-[16/9] w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-md overflow-hidden relative">
                  <Image
                    src="/images/hero/dashboard.png"
                    alt="ERP Dashboard"
                    width={600}
                    height={338}
                    className="object-cover w-full h-full z-10"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent z-20 pointer-events-none"></div>
                </div>

                {/* Caption */}
                <div className="mt-4 text-center text-base text-body-color dark:text-body-color-dark">
                  {t('hero.dashboard.caption')}
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute -bottom-2 -right-2 w-16 h-16 z-[-1]">
                <div className="absolute top-0 left-0 w-full h-full border-r-4 border-b-4 border-primary/20 rounded-br-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration elements */}
      <div className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100">
        <Image
          src="/images/hero/shape-02.svg"
          alt="Shape"
          width={364}
          height={201}
          className="max-w-full"
        />
      </div>

      {/* Additional shape for middle-left */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 z-[-1] hidden lg:block opacity-20">
        <Image
          src="/images/hero/shape-01.svg"
          alt="Shape"
          width={250}
          height={306}
          className="max-w-full rotate-180"
        />
      </div>
    </section>
  );
};

export default WelcomeHero;