"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const CallToAction = () => {
  const { t } = useLanguage();
  return (
    <section className="relative z-10 overflow-hidden py-16 md:py-20 lg:py-28">
      {/* Background Pattern */}
      <div className="absolute left-0 top-0 z-[-1] h-full w-full">
        <svg
          width="1440"
          height="886"
          viewBox="0 0 1440 886"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-0 top-0 h-full w-full object-cover object-center"
        >
          <rect
            opacity="0.5"
            x="193.541"
            y="-356.439"
            width="1363.87"
            height="1168.92"
            transform="rotate(31.6554 193.541 -356.439)"
            fill="url(#paint0_linear_94:889)"
          />
          <rect
            opacity="0.5"
            x="-330.935"
            y="-167.217"
            width="1363.87"
            height="1168.92"
            transform="rotate(31.6554 -330.935 -167.217)"
            fill="url(#paint1_linear_94:889)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_94:889"
              x1="875.475"
              y1="-356.439"
              x2="875.475"
              y2="812.477"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0.62" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_94:889"
              x1="351"
              y1="-167.217"
              x2="351"
              y2="1001.7"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0.62" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container">
        <div className="wow fadeInUp relative mx-auto max-w-[850px] overflow-hidden rounded-lg bg-white px-8 py-12 text-center shadow-lg dark:bg-gray-dark sm:px-12 md:px-16 md:py-16 lg:px-20 lg:py-20" data-wow-delay=".1s">
          {/* Section Content */}
          <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[45px] md:leading-tight">
            {t('cta.title')}
          </h2>
          <p className="mb-10 text-base font-medium text-body-color dark:text-body-color-dark">
            {t('cta.description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link
              href="/signup"
              className="rounded-md bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80 w-full sm:w-auto"
            >
              {t('hero.cta.startnow')}
            </Link>
            <Link
              href="/contact"
              className="rounded-md bg-black/20 px-8 py-4 text-base font-semibold text-dark duration-300 ease-in-out hover:bg-black/30 dark:bg-white/10 dark:text-white dark:hover:bg-white/5 w-full sm:w-auto"
            >
              {t('cta.demo')}
            </Link>
          </div>

          {/* Decorative Elements */}
          <div>
            <span className="absolute left-0 top-0 z-[-1]">
              <svg
                width="189"
                height="162"
                viewBox="0 0 189 162"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="16"
                  cy="-16.5"
                  rx="173"
                  ry="178.5"
                  transform="rotate(180 16 -16.5)"
                  fill="url(#paint0_linear_25:218)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_25:218"
                    x1="-157"
                    y1="-107.754"
                    x2="98.5011"
                    y2="-106.425"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" stopOpacity="0.07" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="absolute bottom-0 right-0 z-[-1]">
              <svg
                width="191"
                height="208"
                viewBox="0 0 191 208"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="173"
                  cy="178.5"
                  rx="173"
                  ry="178.5"
                  fill="url(#paint0_linear_25:219)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_25:219"
                    x1="-3.27832e-05"
                    y1="87.2457"
                    x2="255.501"
                    y2="88.5747"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" stopOpacity="0.07" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
