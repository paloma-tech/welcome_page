"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getToken, isAuthenticated, logout } from "@/lib/auth";
import { useLanguage } from "@/contexts/LanguageContext";
import { PhoneInput } from "@/components/ui/phone-input";
import { validatePhoneNumber } from "@/lib/utils";

const Profile = () => {
  const router = useRouter();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    adresse: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    adresse: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push("/signin");
      return;
    }

    // Fetch user profile
    const fetchProfile = async () => {
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

        const response = await fetch("/api/auth/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (data.success) {
          setFormData({
            fullName: data.user.fullName || "",
            email: data.user.email || "",
            company: data.user.company || "",
            adresse: data.user.adresse || "",
            phone: data.user.phone || "",
          });
        } else {
          setError(t('profile.error.session'));
          logout();
          router.push("/signin");
        }
      } catch (err) {
        setError(t('profile.error.loading'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const validateField = (name: string, value: string) => {
    let errorMessage = "";

    switch (name) {
      case "fullName":
        if (!value.trim()) {
          errorMessage = t('profile.fullName.error.required');
        } else if (value.trim().length < 2) {
          errorMessage = t('profile.fullName.error.length');
        }
        break;

      case "adresse":
        if (value && value.trim().length < 5) {
          errorMessage = t('profile.address.error.length');
        }
        break;

      case "phone":
        if (value && !validatePhoneNumber(value)) {
          errorMessage = t('profile.phone.error.invalid');
        }
        break;
    }

    return errorMessage;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate the field
    if (name in errors) {
      const errorMessage = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: errorMessage,
      }));
    }
  };

  // Handle phone input change separately since it's not a standard input
  const handlePhoneChange = (value: string | undefined) => {
    const phoneValue = value || "";
    setFormData((prev) => ({
      ...prev,
      phone: phoneValue,
    }));

    // Validate the phone field
    const errorMessage = validateField("phone", phoneValue);
    setErrors((prev) => ({
      ...prev,
      phone: errorMessage,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate all fields
    const newErrors = {
      fullName: validateField("fullName", formData.fullName),
      adresse: validateField("adresse", formData.adresse),
      phone: validateField("phone", formData.phone),
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    try {
      setIsSubmitting(true);

      const token = getToken();
      if (!token) {
        setError(t('profile.error.auth'));
        logout();
        router.push("/signin");
        return;
      }

      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          company: formData.company,
          adresse: formData.adresse,
          phone: formData.phone
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(data.message || t('profile.success'));
      } else {
        if (response.status === 401) {
          // Token is invalid or expired
          setError(t('profile.error.session'));
          logout();
          router.push("/signin");
        } else {
          setError(data.message || t('profile.error.update'));
        }
      }
    } catch (err) {
      setError(t('profile.error.general'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="mx-auto max-w-[500px] text-center">
            <p>{t('profile.loading')}</p>
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
              <div className="mx-auto max-w-[600px] rounded-md bg-primary/[.03] px-6 py-10 shadow-md dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  {t('profile.title')}
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  {t('profile.subtitle')}
                </p>
                {error && (
                  <div className="mb-8 rounded-sm bg-red-50 p-4 text-center text-red-500 dark:bg-red-900/30">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="mb-8 rounded-sm bg-green-50 p-4 text-center text-green-500 dark:bg-green-900/30">
                    {success}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      {t('profile.email.label')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      readOnly
                      disabled
                      className="w-full rounded-md border border-transparent bg-gray-100 px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="fullName"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      {t('profile.fullName.label')}
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder={t('profile.fullName.placeholder')}
                      className={`w-full rounded-md border ${
                        errors.fullName ? 'border-red-500' : 'border-transparent'
                      } px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                    )}
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="company"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      {t('profile.company.label')}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={t('profile.company.placeholder')}
                      className="w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="adresse"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      {t('profile.address.label')}
                    </label>
                    <input
                      type="text"
                      name="adresse"
                      value={formData.adresse}
                      onChange={handleChange}
                      placeholder={t('profile.address.placeholder')}
                      className={`w-full rounded-md border ${
                        errors.adresse ? 'border-red-500' : 'border-transparent'
                      } px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp`}
                    />
                    {errors.adresse && (
                      <p className="mt-1 text-sm text-red-500">{errors.adresse}</p>
                    )}
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="phone"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      {t('profile.phone.label')}
                    </label>
                    <div className={`${errors.phone ? 'border-red-500 rounded-md border' : ''}`}>
                      <PhoneInput
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        placeholder={t('profile.phone.placeholder')}
                        defaultCountry="TN"
                        className="shadow-one dark:shadow-signUp"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                  <div className="mb-6 flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex w-full items-center justify-center rounded-md bg-primary px-10 py-4 text-base font-medium text-white transition duration-300 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting ? t('profile.button.updating') : t('profile.button.update')}
                    </button>
                    <Link
                      href="/dashboard"
                      className="flex w-full items-center justify-center rounded-md bg-gray-200 px-10 py-4 text-base font-medium text-gray-700 transition duration-300 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      {t('profile.button.back')}
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        router.push("/");
                      }}
                      className="flex w-full items-center justify-center rounded-md bg-red-500 px-10 py-4 text-base font-medium text-white transition duration-300 hover:bg-red-600"
                    >
                      {t('profile.button.signout')}
                    </button>
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

export default Profile;
