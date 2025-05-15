import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { isValidPhoneNumber, formatPhoneNumber, parsePhoneNumber } from 'react-phone-number-input'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = "TND"): string {
  return new Intl.NumberFormat("fr-TN", {
    style: "currency",
    currency,
    minimumFractionDigits: 3,
  }).format(amount)
}

export function formatNumber(number: number): string {
  return new Intl.NumberFormat().format(number)
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`
}

export function getGrowthIndicator(value: number) {
  if (value > 0) return "positive"
  if (value < 0) return "negative"
  return "neutral"
}

/**
 * Validates a phone number using the react-phone-number-input library
 * @param phoneNumber The phone number to validate
 * @param countryCode Optional country code to validate against (e.g., 'TN')
 * @returns True if the phone number is valid, false otherwise
 */
export function validatePhoneNumber(phoneNumber: string, countryCode?: string): boolean {
  if (!phoneNumber) return true; // Empty is valid (not required)
  return isValidPhoneNumber(phoneNumber, countryCode);
}

/**
 * Formats a phone number for display
 * @param phoneNumber The phone number to format
 * @returns The formatted phone number
 */
export function formatPhone(phoneNumber: string): string {
  if (!phoneNumber) return '';
  try {
    return formatPhoneNumber(phoneNumber, 'INTERNATIONAL');
  } catch (error) {
    return phoneNumber; // Return original if formatting fails
  }
}

/**
 * Gets the country code from a phone number
 * @param phoneNumber The phone number
 * @returns The country code or undefined
 */
export function getPhoneCountry(phoneNumber: string): string | undefined {
  if (!phoneNumber) return undefined;
  try {
    const parsed = parsePhoneNumber(phoneNumber);
    return parsed?.country;
  } catch (error) {
    return undefined;
  }
}
