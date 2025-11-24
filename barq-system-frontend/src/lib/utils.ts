import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(
  image: { url: string; key: string } | null | undefined
) {
  if (!image || !image?.url || !image?.key) return '';
  return `${image?.url}${image?.key}`;
}

