"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getToken, isAuthenticated, logout } from "@/lib/auth";
import DashboardTabs from "@/components/Dashboard/DashboardTabs";
import { useLanguage } from "@/contexts/LanguageContext";

const Dashboard = () => {
  const router = useRouter();
  const { t } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push("/signin");
      return;
    }

    const fetchUserData = async () => {
      try {
        const token = getToken();

        // First check if the user has a valid license
        const licenseResponse = await fetch("/api/license/check", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        const licenseData = await licenseResponse.json();

        // If the user doesn't have a valid license, redirect to the license page
        if (licenseResponse.ok && licenseData.success && !licenseData.hasValidLicense) {
          router.push("/license");
          return;
        }

        // If there was an error checking the license, proceed with fetching user data
        // We'll handle license validation again when we get the user data

        const response = await fetch("/api/auth/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (data.success) {
          setUser(data.user);
        } else {
          setError(t('dashboard.error.session'));
          logout();
          router.push("/signin");
        }
      } catch (err) {
        setError(t('dashboard.error.loading'));
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router, t]);

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[1200px] rounded-md bg-primary/[.03] px-6 py-10 shadow-md dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  {t('dashboard.title')}
                </h3>

                {loading ? (
                  <p className="text-center">{t('dashboard.loading')}</p>
                ) : error ? (
                  <div className="mb-8 rounded-sm bg-red-50 p-4 text-center text-red-500 dark:bg-red-900/30">
                    {error}
                  </div>
                ) : user ? (
                  <>
                    <p className="mb-8 text-center text-base font-medium text-body-color">
                      {t('dashboard.welcome').replace('{name}', user.fullName)}
                    </p>

                    <div className="mb-8">
                      <DashboardTabs />
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        href="/profile"
                        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-white transition duration-300 hover:bg-primary/90"
                      >
                        {t('dashboard.button.editProfile')}
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          router.push("/");
                        }}
                        className="inline-flex items-center justify-center rounded-md bg-red-500 px-6 py-3 text-base font-medium text-white transition duration-300 hover:bg-red-600"
                      >
                        {t('dashboard.button.signOut')}
                      </button>
                      <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-md bg-gray-200 px-6 py-3 text-base font-medium text-gray-700 transition duration-300 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                      >
                        {t('dashboard.button.homePage')}
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <p className="mb-4 text-body-color">{t('dashboard.needSignIn')}</p>
                    <Link
                      href="/signin"
                      className="rounded-md bg-primary px-8 py-3 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                    >
                      {t('dashboard.button.signIn')}
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

export default Dashboard;
