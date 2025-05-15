"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { saveToken } from "@/lib/auth";
import { useLanguage } from "@/contexts/LanguageContext";

// Component that uses searchParams
function EmailVerifiedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (token) {
      // Save the token to localStorage
      saveToken(token);

      // Set a timer to redirect to license page
      setIsRedirecting(true);
      const timer = setTimeout(() => {
        router.push("/license");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [token, router]);

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[500px] rounded-md bg-primary/[.03] px-6 py-10 shadow-md dark:bg-dark sm:p-[60px]">
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-primary bg-opacity-10 text-primary mx-auto">
                  <svg
                    className="w-10 h-10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  {t('email.verified.title')}
                </h3>
                <p className="mb-6 text-center text-base font-medium text-body-color">
                  {t('email.verified.subtitle')}
                </p>
                <p className="mb-6 text-center text-base font-medium text-body-color">
                  {t('email.verified.licenseInfo')}
                </p>

                {isRedirecting ? (
                  <div className="mb-8 text-center">
                    <p className="text-primary">{t('email.verified.redirecting')}</p>
                    <div className="mt-4 flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <Link
                      href="/license"
                      className="rounded-md bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/90"
                    >
                      {t('email.verified.activateButton')}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

// Loading fallback
function EmailVerifiedLoading() {
  return (
    <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[500px] rounded-md bg-primary/[.03] px-6 py-10 shadow-md dark:bg-dark sm:p-[60px]">
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-primary bg-opacity-10 text-primary mx-auto">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
              <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Email Verification
              </h3>
              <p className="mb-6 text-center text-base font-medium text-body-color">
                Loading...
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main component with Suspense boundary
const EmailVerified = () => {
  return (
    <Suspense fallback={<EmailVerifiedLoading />}>
      <EmailVerifiedContent />
    </Suspense>
  );
};

export default EmailVerified;
