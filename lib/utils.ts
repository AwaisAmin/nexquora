import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { AccentColor } from '@/lib/types'

/** Merge Tailwind classes safely — deduplicates conflicting utilities. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/** Format an ISO date string to "Month YYYY". */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
}

/** Convert a string to a URL-safe lowercase-hyphenated slug. */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const ACCENT_HEX: Record<AccentColor, string> = {
  cyan:   '#00F5FF',
  gold:   '#FFB800',
  purple: '#7C3AED',
  blue:   '#3B82F6',
  green:  '#10B981',
  amber:  '#F59E0B',
}

/** Map an AccentColor name to its hex value. Falls back to cyan. */
export function getAccentHex(accent: string): string {
  return ACCENT_HEX[accent as AccentColor] ?? ACCENT_HEX.cyan
}

/** Clamp a number between min and max. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
