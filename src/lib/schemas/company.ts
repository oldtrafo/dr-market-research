import { z } from "zod";

export const SECTORS = [
  "Agriculture",
  "Construction",
  "Education",
  "Energy",
  "Finance",
  "Food & Beverage",
  "Healthcare",
  "Hospitality & Tourism",
  "Manufacturing",
  "Mining",
  "Real Estate",
  "Retail",
  "Technology",
  "Telecommunications",
  "Textiles",
  "Transportation",
  "Other",
] as const;

export const companySchema = z.object({
  company_name: z
    .string()
    .min(1, "Company name is required")
    .max(200, "Company name must be 200 characters or fewer"),
  founded_year: z
    .coerce.number()
    .int()
    .min(1800, "Year must be 1800 or later")
    .max(new Date().getFullYear(), "Year cannot be in the future")
    .nullable()
    .optional()
    .transform((v) => v ?? null),
  about: z
    .string()
    .max(2000, "About must be 2000 characters or fewer")
    .nullable()
    .optional()
    .transform((v) => v || null),
  sector: z
    .string()
    .nullable()
    .optional()
    .transform((v) => v || null),
  products: z
    .string()
    .max(1000, "Products must be 1000 characters or fewer")
    .nullable()
    .optional()
    .transform((v) => v || null),
  factory: z
    .string()
    .max(500, "Factory info must be 500 characters or fewer")
    .nullable()
    .optional()
    .transform((v) => v || null),
  contact: z
    .string()
    .max(500, "Contact must be 500 characters or fewer")
    .nullable()
    .optional()
    .transform((v) => v || null),
  score: z
    .coerce.number()
    .min(0, "Score must be 0 or higher")
    .max(10, "Score must be 10 or lower")
    .nullable()
    .optional()
    .transform((v) => v ?? null),
});

export type CompanyFormData = z.infer<typeof companySchema>;
