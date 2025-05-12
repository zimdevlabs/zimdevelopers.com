import { env } from "@/env";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import slugify from "slugify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return new URL(path, env.NEXT_PUBLIC_APP_URL).href;
}

export const truncateOnWord = (
  text: string,
  maxLength: number,
  ellipsis = true,
) => {
  if (text.length <= maxLength) return text;

  // First split on maxLength chars
  let truncatedText = text.substring(0, 148);

  // Then split on the last space, this way we split on the last word,
  // which looks just a bit nicer.
  truncatedText = truncatedText.substring(
    0,
    Math.min(truncatedText.length, truncatedText.lastIndexOf(" ")),
  );

  if (ellipsis) truncatedText += "...";

  return truncatedText;
};

export function convertToSlug(
  text?: string,
  { fallback }: { fallback?: string } = { fallback: "top-level" },
) {
  if (!text) return fallback;
  return slugify(text.trim(), {
    lower: true,
    remove: /[^a-zA-Z0-9 ]/g,
  });
}
