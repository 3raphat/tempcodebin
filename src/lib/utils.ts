import { clsx, type ClassValue } from "clsx"
import { customAlphabet } from "nanoid"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function nanoid(chars?: number) {
  return customAlphabet(
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    chars ?? 7
  )()
}

export function getUrlWithoutProtocal(url: string) {
  return url.replace(/(^\w+:|^)\/\//, "")
}
