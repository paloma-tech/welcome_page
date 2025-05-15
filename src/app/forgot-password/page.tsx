"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate email
    if (!email.trim()) {
      setError(t('forgotPassword.error.required'));
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t('forgotPassword.error.invalid'));
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(data.message);
        setEmail("");
      } else {
        setError(data.message || t('forgotPassword.error.failed'));
      }
    } catch (err) {
      setError(t('forgotPassword.error.general'));
    } finally {
      setIsSubmitting(false);
    }
  };

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
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  {t('forgotPassword.title')}
                </h3>
                <p className="mb-8 text-center text-base font-medium text-body-color">
                  {t('forgotPassword.subtitle')}
                </p>
                {error && (
                  <div className="mb-8 rounded-sm bg-red-50 p-4 text-center text-red-500 dark:bg-red-900/30">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="mb-8 rounded-sm bg-green-50 p-6 text-center dark:bg-green-900/30">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-500 mx-auto">
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
                    <p className="text-green-500 font-medium">{success}</p>
                    <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                      {t('forgotPassword.success.checkEmail')}
                    </p>
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      {t('forgotPassword.email.label')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('forgotPassword.email.placeholder')}
                      className="w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                    />
                  </div>
                  <div className="mb-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex w-full items-center justify-center rounded-md bg-primary px-10 py-4 text-base font-medium text-white transition duration-300 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting ? t('forgotPassword.button.sending') : t('forgotPassword.button.send')}
                    </button>
                  </div>
                  <p className="text-center text-base font-medium text-body-color">
                    {t('forgotPassword.rememberPassword')}{" "}
                    <Link href="/signin" className="text-primary hover:underline">
                      {t('forgotPassword.signin')}
                    </Link>
                  </p>
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

export default ForgotPassword;
