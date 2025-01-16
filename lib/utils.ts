import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatToIDR(value: number) {
  const nominal = parseFloat(value.toString())
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(nominal)

  return formatted
}

export function formatDateToIndonesia(date: Date) {
  const tanggal = date
  const formatted = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long"
  }).format(tanggal)

  return formatted
}