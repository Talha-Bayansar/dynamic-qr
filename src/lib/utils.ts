import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

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

// ARRAY UTILITY FUNCTIONS
export const isArrayEmpty = (array: unknown[] | undefined | null) => {
  if (!array) return true;

  return array.length < 1;
};

export const generateArray = (size: number = 10) => {
  return Array.from({ length: size }, (_, i) => i);
};

export const isLastOfArray = (index: number, array: unknown[]) => {
  return index === array.length - 1;
};

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
type Literal = z.infer<typeof literalSchema>;
type Json = Literal | { [key: string]: Json } | Json[];
export const jsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
);
