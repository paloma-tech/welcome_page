import Link from "next/link";

const WelcomeHero = () => {
  return (
    <section className="relative z-10 overflow-hidden bg-primary/5 dark:bg-gray-dark pb-16 pt-[120px] dark:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px]">
      <div className="container">
        <div className="flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[800px] text-center">
              <div className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                Empower Your Business with Our Cloud-Optional ERP & POS Solution
              </div>
              <p className="mb-12 text-base leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
                Effortlessly manage sales, inventory, and operations with our cutting-edge cloud-optional ERP system
              </p>
              
              {/* Mobile-responsive button container */}
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link
                  href="/signup"
                  className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/90 w-full md:w-auto text-center"
                >
                  Sign Up
                </Link>
                <Link
                  href="/signin"
                  className="rounded-sm bg-black/20 px-8 py-4 text-base font-semibold text-black dark:text-white duration-300 ease-in-out hover:bg-black/30 dark:bg-white/10 dark:hover:bg-white/20 w-full md:w-auto md:hidden text-center"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration elements */}
      <div className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100">
        <svg
          width="364"
          height="201"
          viewBox="0 0 364 201"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
            stroke="url(#paint0_linear_25:218)"
          />
          <path
            d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
            stroke="url(#paint1_linear_25:218)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_25:218"
              x1="184.389"
              y1="69.2405"
              x2="184.389"
              y2="212.24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_25:218"
              x1="156.389"
              y1="69.2405"
              x2="156.389"
              y2="212.24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default WelcomeHero;