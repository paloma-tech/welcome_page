import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registration Success",
  description: "Thank you for registering",
};

const RegistrationSuccess = () => {
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
                  Registration Successful!
                </h3>
                <p className="mb-4 text-center text-base font-medium text-body-color">
                  Your account has been created successfully.
                </p>
                <p className="mb-4 text-center text-base font-medium text-body-color">
                  Please check your email to verify your account. After verification, you&apos;ll need to enter your pre-activated license key.
                </p>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  You must have a pre-activated license key that is not assigned to any user. If you don&apos;t have one, please contact our support team.
                </p>
                <div className="flex justify-center">
                  <Link
                    href="/"
                    className="rounded-md bg-primary px-10 py-4 text-base font-medium text-white transition duration-300 hover:bg-primary/90"
                  >
                    Return to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegistrationSuccess;