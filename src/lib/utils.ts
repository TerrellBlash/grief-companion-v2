/**
 * Utility function for merging Tailwind CSS classes with proper conflict resolution
 * Combines clsx functionality with tailwind-merge to handle Tailwind class conflicts
 */

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes
    .filter((cls): cls is string => Boolean(cls) && typeof cls === 'string')
    .join(' ')
}

/**
 * Alternative: If you want to use clsx + tailwind-merge in the future,
 * install both and use:
 *
 * import { clsx, type ClassValue } from 'clsx'
 * import { twMerge } from 'tailwind-merge'
 *
 * export function cn(...inputs: ClassValue[]) {
 *   return twMerge(clsx(inputs))
 * }
 */
