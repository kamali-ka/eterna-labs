import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with clsx
 * Prevents class conflicts and enables conditional styling
 *
 * @example
 * cn('px-4 py-2', condition && 'bg-blue-500', { 'font-bold': isActive })
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
