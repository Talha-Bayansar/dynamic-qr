import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createSuccessResponse = <T>(data?: T) => {
  return {
    success: true,
    data,
    message: null,
  };
};

export const createErrorResponse = (message: string) => {
  return {
    success: false,
    data: null,
    message,
  };
};
