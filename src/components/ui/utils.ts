import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number | undefined | null) {
  if (value == null || isNaN(value as number)) return '0đ';
  return (value as number).toLocaleString('vi-VN') + 'đ';
}
