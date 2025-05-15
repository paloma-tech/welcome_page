"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0); // 0-4 scale

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing reset token");
    }
  }, [token]);

  // Check password strength
  const checkPasswordStrength = (password: string) => {
    let score = 0;

    // Length check
    if (password.length >= 8) score++;

    // Contains lowercase
    if (/[a-z]/.test(password)) score++;

    // Contains uppercase
    if (/[A-Z]/.test(password)) score++;

    // Contains number
    if (/[0-9]/.test(password)) score++;

    // Contains special character
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    return score;
  };

  // Update password and check strength
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate passwords
    if (!password) {
      setError("Password is required");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    // Check password strength
    if (passwordStrength < 3) {
      setError("Please choose a stronger password");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(data.message);
        // Redirect to success page after 1 second
        setTimeout(() => {
          router.push("/password-reset-success");
        }, 1000);
      } else {
        setError(data.message || "Failed to reset password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
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
                  Reset Your Password
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  Enter your new password below.
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
                {!token ? (
                  <div className="text-center">
                    <p className="mb-6 text-body-color">
                      The reset link is invalid or has expired. Please try again.
                    </p>
                    <Link
                      href="/forgot-password"
                      className="rounded-md bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/90 inline-block"
                    >
                      Request New Link
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-8">
                      <label
                        htmlFor="password"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Enter your new password"
                        className="w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      />

                      {/* Password strength indicator */}
                      {password.length > 0 && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                              Password strength: {
                                passwordStrength === 0 ? "Very weak" :
                                passwordStrength === 1 ? "Weak" :
                                passwordStrength === 2 ? "Fair" :
                                passwordStrength === 3 ? "Good" :
                                "Strong"
                              }
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                            <div
                              className={`h-2 rounded-full ${
                                passwordStrength === 0 ? "bg-red-500 w-1/5" :
                                passwordStrength === 1 ? "bg-orange-500 w-2/5" :
                                passwordStrength === 2 ? "bg-yellow-500 w-3/5" :
                                passwordStrength === 3 ? "bg-blue-500 w-4/5" :
                                "bg-green-500 w-full"
                              }`}
                            ></div>
                          </div>
                          <ul className="mt-2 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                            <li className={password.length >= 8 ? "text-green-500" : ""}>
                              • At least 8 characters
                            </li>
                            <li className={/[A-Z]/.test(password) ? "text-green-500" : ""}>
                              • At least one uppercase letter
                            </li>
                            <li className={/[a-z]/.test(password) ? "text-green-500" : ""}>
                              • At least one lowercase letter
                            </li>
                            <li className={/[0-9]/.test(password) ? "text-green-500" : ""}>
                              • At least one number
                            </li>
                            <li className={/[^a-zA-Z0-9]/.test(password) ? "text-green-500" : ""}>
                              • At least one special character
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="mb-8">
                      <label
                        htmlFor="confirmPassword"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your new password"
                        className="w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      />
                    </div>
                    <div className="mb-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex w-full items-center justify-center rounded-md bg-primary px-10 py-4 text-base font-medium text-white transition duration-300 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isSubmitting ? "Resetting..." : "Reset Password"}
                      </button>
                    </div>
                  </form>
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

export default ResetPassword;
