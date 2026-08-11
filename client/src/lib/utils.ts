import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Staggers a list's entrance delays by index.
 *
 * Lives here rather than beside `Reveal` because most callers are Server
 * Components, and a `"use client"` module can only be rendered from the
 * server, never called from it.
 */
export function stagger(index: number, step = 0.06) {
  return index * step;
}
