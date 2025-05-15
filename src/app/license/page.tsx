"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getToken, isAuthenticated, logout } from "@/lib/auth";
import { useLanguage } from "@/contexts/LanguageContext";

const LicenseActivation = () => {
  const router = useRouter();
  const [licenseKey, setLicenseKey] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push("/signin");
      return;
    }

    // Check if user already has a valid license
    const checkLicense = async () => {
      try {
        const token = getToken();

        const response = await fetch("/api/license/check", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (data.success && data.hasValidLicense) {
          // User already has a valid license, redirect to dashboard
          router.push("/dashboard");
        }
      } catch (err) {
        console.error("Error checking license:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkLicense();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!licenseKey.trim()) {
      setError(t('license.error.empty'));
      return;
    }

    try {
      setIsSubmitting(true);
      const token = getToken();

      if (!token) {
        setError(t('license.error.auth'));
        logout();
        router.push("/signin");
        return;
      }

      const response = await fetch("/api/license/activate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ licenseKey })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(data.message || t('license.success'));
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        setError(data.message || t('license.error.failed'));
      }
    } catch (err) {
      setError(t('license.error.general'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="mx-auto max-w-[500px] text-center">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
            <p className="mt-4 text-body-color">{t('license.loading')}</p>
          </div>
        </div>
      </section>
    );
  }

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
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  {t('license.title')}
                </h3>
                <p className="mb-4 text-center text-base font-medium text-body-color">
                  {t('license.subtitle')}
                </p>
                <p className="mb-8 text-center text-base font-medium text-body-color text-gray-500 dark:text-gray-400">
                  {t('license.note')}
                </p>

                {error && (
                  <div className="mb-8 rounded-sm bg-red-50 p-4 text-center text-red-500 dark:bg-red-900/30">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="mb-8 rounded-sm bg-green-50 p-4 text-center text-green-500 dark:bg-green-900/30">
                    <div className="mb-2 flex justify-center">
                      <svg
                        className="w-6 h-6"
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
                    {success}
                    <p className="mt-2 text-sm">{t('license.redirecting')}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-8">
                    <label
                      htmlFor="licenseKey"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      {t('license.label')}
                    </label>
                    <input
                      type="text"
                      id="licenseKey"
                      value={licenseKey}
                      onChange={(e) => setLicenseKey(e.target.value)}
                      placeholder={t('license.placeholder')}
                      className="w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                    />
                  </div>

                  <div className="mb-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex w-full items-center justify-center rounded-md bg-primary px-10 py-4 text-base font-medium text-white transition duration-300 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting ? t('license.button.verifying') : t('license.button.submit')}
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="text-base text-body-color">
                      {t('license.noKey')}{" "}
                      <Link href="/contact" className="text-primary hover:underline">
                        {t('license.contactSupport')}
                      </Link>
                    </p>
                  </div>
                </form>
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

export default LicenseActivation;
