"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import menuData from "./menuData";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
// import ThemeToggler from "./ThemeToggler";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const { t } = useLanguage();

  const pathname = usePathname();

  // Close navbar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (navbarOpen && !target.closest('#navbarCollapse') && !target.closest('button[aria-label="Mobile Menu"]')) {
        setNavbarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navbarOpen]);

  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    return () => {
      window.removeEventListener("scroll", handleStickyNavbar);
    };
  }, []);

  return (
    <>
      {/* Mobile menu backdrop overlay */}
      {navbarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-35 lg:hidden"
          onClick={() => setNavbarOpen(false)}
        />
      )}
      <header
        className={`header top-0 left-0 z-40 flex w-full items-center ${
          sticky
            ? "fixed z-[9999] bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition dark:bg-gray-dark dark:shadow-sticky-dark"
            : "absolute bg-transparent"
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4 xl:mr-12">
              <Link
                href="/"
                className={`header-logo block w-full ${
                  sticky ? "py-5 lg:py-2" : "py-8"
                }`}
              >
                <Image
                  src="/logo/white logo.png"
                  alt="logo"
                  width={205}
                  height={49}
                  className={sticky ? "hidden dark:block" : "hidden dark:block"}
                />
                <Image
                  src="/logo/black logo.png"
                  alt="logo"
                  width={205}
                  height={49}
                  className={sticky ? "block dark:hidden" : "block dark:hidden"}
                />
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  onClick={() => setNavbarOpen(!navbarOpen)}
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200 ring-primary focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "top-[7px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "top-[-7px] -rotate-45" : ""
                    }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`navbar absolute right-4 z-40 w-[280px] rounded-lg border border-gray-200 bg-white px-6 py-5 shadow-lg transition-all duration-300 ease-in-out dark:border-gray-700 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:shadow-none lg:opacity-100 ${
                    navbarOpen
                      ? "translate-y-0 opacity-100 visible"
                      : "translate-y-4 opacity-0 invisible"
                  }`}
                >
                  <ul className="block divide-y divide-gray-100 dark:divide-gray-700 lg:divide-y-0 lg:flex lg:space-x-12">
                    {menuData.map((menuItem, index) => (
                      <li key={menuItem.id} className={index > 0 ? "pt-2 lg:pt-0" : ""}>
                        <Link
                          href={menuItem.path}
                          className={`flex py-3 text-base font-medium lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                            pathname === menuItem.path
                              ? "text-primary dark:text-white"
                              : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
                          }`}
                        >
                          {t(`header.${menuItem.title.toLowerCase().replace(/\s+/g, '')}`)}
                        </Link>
                      </li>
                    ))}
                    {/* Mobile login button */}
                    <div className="mt-4 pt-4 md:hidden">
                      <Link
                        href="/signin"
                        className="rounded-md border border-primary bg-white px-4 py-3 text-sm font-medium text-primary hover:bg-primary hover:text-white transition duration-300 text-center block shadow-sm"
                      >
                        {t('hero.cta.login')}
                      </Link>
                    </div>
                  </ul>
                </nav>
              </div>
              <div className="flex items-center justify-end pr-16 lg:pr-0">
                <div className="hidden md:flex items-center mr-4">
                  <Link
                    href="/signin"
                    className="rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white transition duration-300"
                  >
                    {t('hero.cta.login')}
                  </Link>
                </div>
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
