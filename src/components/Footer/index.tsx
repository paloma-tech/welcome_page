"use client";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-gray-dark pt-16 dark:bg-gray-dark md:pt-20 lg:pt-24">
      <div className="container">
        <div className="wow fadeInUp -mx-4 flex flex-wrap" data-wow-delay=".15s">
          <div className="w-full px-4">
            {/* Top footer content */}
            <div className="-mx-4 flex flex-wrap items-start justify-between">
              <div className="w-full px-4 md:w-1/2 lg:w-4/12">
                <div className="mb-4 text-center md:text-left lg:mb-16">
                  <Link href="/" className="mb-1 inline-block">
                    <Image
                      src="/logo/white logo.png"
                      alt="logo"
                      width={205}
                      height={49}
                      className="block dark:hidden"
                    />
                    <Image
                      src="/logo/white logo.png"
                      alt="logo"
                      width={205}
                      height={49}
                      className="hidden dark:block"
                    />
                  </Link>
                  <div className="flex items-center justify-center md:justify-start gap-6">
                    <Link
                      href="https://www.instagram.com/paloma.tn/"
                      target="_blank"
                      className="text-white hover:text-primary md:ml-9"
                      aria-label="Instagram"
                    >
                      <i className="fab fa-instagram text-2xl" />
                    </Link>
                    <Link
                      href="https://www.linkedin.com/company/palomaa"
                      target="_blank"
                      className="text-white hover:text-primary"
                      aria-label="LinkedIn"
                    >
                      <i className="fab fa-linkedin text-2xl" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="w-full px-4 md:w-1/2 lg:w-4/12">
                <div className="mb-12 text-center md:text-right lg:mb-16">
                  <div className="text-base font-medium text-body-color dark:text-body-color-dark">
                    <Link
                      href="mailto:contact@paloma.tn"
                      className="block hover:text-primary"
                    >
                      contact@paloma.tn
                    </Link>
                    <Link
                      href="tel:+21692530875"
                      className="mt-2 block hover:text-primary"
                    >
                      +216 92 530 875
                    </Link>
                    <Link
                      href="tel:+21690656399"
                      className="block hover:text-primary"
                    >
                      +216 90 656 399
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Copyright */}
            <div className="border-t border-body-color/10 py-8 dark:border-white/10">
              <p className="text-center text-base text-body-color dark:text-body-color-dark">
                Copyright © {new Date().getFullYear()} Paloma, All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
