import { z } from "zod";

export const productSchema = z.object({
  product_name: z
    .string()
    .min(1, "Product name is required")
    .max(200, "Product name must be 200 characters or fewer"),
  description: z
    .string()
    .max(2000, "Description must be 2000 characters or fewer")
    .nullable()
    .optional()
    .transform((v) => v || null),
  hs_code: z
    .string()
    .max(20, "HS code must be 20 characters or fewer")
    .nullable()
    .optional()
    .transform((v) => v || null),
  price_range: z
    .string()
    .max(100, "Price range must be 100 characters or fewer")
    .nullable()
    .optional()
    .transform((v) => v || null),
  min_order_quantity: z
    .string()
    .max(100, "MOQ must be 100 characters or fewer")
    .nullable()
    .optional()
    .transform((v) => v || null),
  production_capacity: z
    .string()
    .max(200, "Production capacity must be 200 characters or fewer")
    .nullable()
    .optional()
    .transform((v) => v || null),
  certifications: z
    .string()
    .max(500, "Certifications must be 500 characters or fewer")
    .nullable()
    .optional()
    .transform((v) => v || null),
  export_ready: z
    .string()
    .optional()
    .transform((v) => v === "on" || v === "true"),
  target_market_fit: z
    .coerce.number()
    .min(0, "Score must be 0 or higher")
    .max(10, "Score must be 10 or lower")
    .nullable()
    .optional()
    .transform((v) => v ?? null),
  image_url: z
    .string()
    .max(500, "Image URL must be 500 characters or fewer")
    .nullable()
    .optional()
    .transform((v) => v || null),
});

export type ProductFormData = z.infer<typeof productSchema>;
