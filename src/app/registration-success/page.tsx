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
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Thank You for Registering!
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  We will contact you soon with further information.
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