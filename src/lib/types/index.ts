export type Company = {
  id: string;
  company_name: string;
  founded_year: number | null;
  about: string | null;
  sector: string | null;
  products: string | null;
  factory: string | null;
  contact: string | null;
  score: number | null;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
};

export type CompanyInsert = Omit<Company, "id" | "created_at" | "updated_at">;
export type CompanyUpdate = Partial<CompanyInsert> & { id: string };

export type Product = {
  id: string;
  company_id: string;
  product_name: string;
  description: string | null;
  hs_code: string | null;
  price_range: string | null;
  min_order_quantity: string | null;
  production_capacity: string | null;
  certifications: string | null;
  export_ready: boolean;
  target_market_fit: number | null;
  image_url: string | null;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
};

export type Note = {
  id: string;
  company_id: string | null;
  product_id: string | null;
  title: string;
  content: string;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
};

export type ActionState = {
  error?: string;
  success?: boolean;
};
