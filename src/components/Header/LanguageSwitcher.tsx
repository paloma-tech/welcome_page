"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useRef, useEffect } from "react";

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (lang: 'fr' | 'en') => {
    setLanguage(lang);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center rounded-md bg-black/10 px-3 py-2 text-sm font-medium text-black dark:bg-white/10 dark:text-white"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="mr-1">{language === 'fr' ? 'FR' : 'EN'}</span>
        <svg
          className="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-dark-2">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              onClick={() => changeLanguage('fr')}
              className={`block w-full px-4 py-2 text-left text-sm ${
                language === 'fr'
                  ? 'bg-primary/10 text-primary dark:bg-primary/20'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-white/80 dark:hover:bg-dark-3'
              }`}
              role="menuitem"
            >
              {t('language.french')}
            </button>
            <button
              onClick={() => changeLanguage('en')}
              className={`block w-full px-4 py-2 text-left text-sm ${
                language === 'en'
                  ? 'bg-primary/10 text-primary dark:bg-primary/20'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-white/80 dark:hover:bg-dark-3'
              }`}
              role="menuitem"
            >
              {t('language.english')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
