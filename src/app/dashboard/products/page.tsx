import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { ProductFilters } from "@/components/products/product-filters";
import { ProductTableRow } from "@/components/products/product-table-row";
import { EmptyState } from "@/components/layout/empty-state";
import { Spinner } from "@/components/ui/spinner";
import type { Product } from "@/lib/types";
import { Package } from "lucide-react";

export const metadata = { title: "Products — DR Market Research" };

type SearchParams = Promise<{
  q?: string;
  export?: string;
  sort?: string;
}>;

type ProductWithCompany = Product & { companies: { company_name: string } | null };

async function Products({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("products")
    .select("*, companies(company_name)");

  if (params.q) {
    query = query.ilike("product_name", `%${params.q}%`);
  }

  if (params.export === "true") {
    query = query.eq("export_ready", true);
  } else if (params.export === "false") {
    query = query.eq("export_ready", false);
  }

  const [sortField, sortDir] = (params.sort ?? "created_at:desc").split(":");
  query = query.order(sortField, { ascending: sortDir === "asc", nullsFirst: false });

  const { data: products, error } = await query;

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
        Failed to load products: {error.message}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState
        title="No products found"
        description="Products are added through company pages. Add a company first, then add products to it."
      />
    );
  }

  return (
    <>
      <p className="text-sm text-gray-500">
        {products.length} {products.length === 1 ? "product" : "products"}
      </p>
      <div className="space-y-2">
        {(products as ProductWithCompany[]).map((product) => (
          <ProductTableRow key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default async function ProductsPage(props: { searchParams: SearchParams }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Package className="h-6 w-6 text-purple-600" />
        <h2 className="text-xl font-bold text-gray-900">Products</h2>
      </div>

      <Suspense>
        <ProductFilters />
      </Suspense>

      <Suspense
        fallback={
          <div className="flex justify-center py-12">
            <Spinner className="h-8 w-8" />
          </div>
        }
      >
        <Products searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}
