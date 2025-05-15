"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { PhoneInput } from "@/components/ui/phone-input";
import { validatePhoneNumber } from "@/lib/utils";

const SignUp = () => {
  const router = useRouter();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    company: "",
    adresse: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    adresse: "",
    phone: "",
    terms: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const validateField = (name: string, value: string) => {
    let errorMessage = "";

    switch (name) {
      case "fullName":
        if (!value.trim()) {
          errorMessage = t('signup.fullName.error.required');
        } else if (value.trim().length < 2) {
          errorMessage = t('signup.fullName.error.length');
        }
        break;

      case "email":
        if (!value.trim()) {
          errorMessage = t('signup.email.error.required');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMessage = t('signup.email.error.invalid');
        }
        break;

      case "password":
        if (!value) {
          errorMessage = t('signup.password.error.required');
        } else if (value.length < 8) {
          errorMessage = t('signup.password.error.length');
        }
        break;

      case "adresse":
        if (value && value.trim().length < 5) {
          errorMessage = t('signup.address.error.length');
        }
        break;

      case "phone":
        if (value && !validatePhoneNumber(value)) {
          errorMessage = t('signup.phone.error.invalid');
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
    const errorMessage = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
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

    // Validate all fields
    const newErrors = {
      fullName: validateField("fullName", formData.fullName),
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
      adresse: validateField("adresse", formData.adresse),
      phone: validateField("phone", formData.phone),
      terms: !agreeToTerms ? t('signup.terms.error') : "",
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        router.push("/registration-success");
      } else {
        setError(data.message || t('signup.error.registration'));
      }
    } catch (err) {
      setError(t('signup.error.general'));
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
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  {t('signup.title')}
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  {t('signup.subtitle')}
                </p>
                {error && (
                  <div className="mb-8 rounded-sm bg-red-50 p-4 text-center text-red-500 dark:bg-red-900/30">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="mb-8">
                    <label
                      htmlFor="fullName"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      {t('signup.fullName.label')}
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder={t('signup.fullName.placeholder')}
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
                      htmlFor="email"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      {t('signup.email.label')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('signup.email.placeholder')}
                      className={`w-full rounded-md border ${
                        errors.email ? 'border-red-500' : 'border-transparent'
                      } px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      {t('signup.password.label')}
                    </label>
                    <input
                      type="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder={t('signup.password.placeholder')}
                      className={`w-full rounded-md border ${
                        errors.password ? 'border-red-500' : 'border-transparent'
                      } px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp`}
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                    )}
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="company"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      {t('signup.company.label')}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={t('signup.company.placeholder')}
                      className="w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="adresse"
                      className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                      {t('signup.address.label')}
                    </label>
                    <input
                      type="text"
                      name="adresse"
                      value={formData.adresse}
                      onChange={handleChange}
                      placeholder={t('signup.address.placeholder')}
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
                      {t('signup.phone.label')}
                    </label>
                    <div className={`${errors.phone ? 'border-red-500 rounded-md border' : ''}`}>
                      <PhoneInput
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        placeholder={t('signup.phone.placeholder')}
                        defaultCountry="TN"
                        className="shadow-one dark:shadow-signUp"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                  <div className="mb-8 flex">
                    <label className="flex cursor-pointer select-none text-sm font-medium text-body-color">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={agreeToTerms}
                          onChange={(e) => {
                            setAgreeToTerms(e.target.checked);
                            setErrors((prev) => ({
                              ...prev,
                              terms: e.target.checked ? "" : t('signup.terms.error'),
                            }));
                          }}
                          className="sr-only"
                        />
                        <div className={`box mr-4 mt-1 flex h-5 w-5 items-center justify-center rounded border ${
                          errors.terms
                            ? 'border-red-500'
                            : agreeToTerms
                              ? 'border-primary bg-primary'
                              : 'border-body-color border-opacity-20 dark:border-white dark:border-opacity-10'
                        }`}>
                          <span className={`opacity-${agreeToTerms ? '100' : '0'}`}>
                            <svg
                              width="11"
                              height="8"
                              viewBox="0 0 11 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972Z"
                                fill="#ffffff"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                      <div>
                        {t('signup.terms.agree')}{" "}
                        <a href="#0" className="text-primary hover:underline">
                          {t('signup.terms.termsConditions')}
                        </a>{" "}
                        {t('signup.terms.and')}{" "}
                        <a href="#0" className="text-primary hover:underline">
                          {t('signup.terms.privacyPolicy')}
                        </a>
                      </div>
                    </label>
                  </div>
                  {errors.terms && (
                    <div className="mb-6 -mt-6">
                      <p className="text-sm text-red-500">{errors.terms}</p>
                    </div>
                  )}
                  <div className="mb-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex w-full items-center justify-center rounded-md bg-primary px-10 py-4 text-base font-medium text-white transition duration-300 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting ? t('signup.button.creating') : t('signup.button.create')}
                    </button>
                  </div>
                  <p className="text-center text-base font-medium text-body-color">
                    {t('signup.haveAccount')}{" "}
                    <Link href="/signin" className="text-primary hover:underline">
                      {t('signup.signin')}
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

export default SignUp;
