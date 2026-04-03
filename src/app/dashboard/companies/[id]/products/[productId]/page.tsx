import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProductForm } from "@/components/products/product-form";
import { DeleteProductButton } from "@/components/products/delete-product-button";
import { updateProduct } from "@/lib/actions/products";
import type { Product } from "@/lib/types";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "Edit Product — DR Market Research" };

type PageProps = {
  params: Promise<{ id: string; productId: string }>;
};

export default async function EditProductPage({ params }: PageProps) {
  const { id, productId } = await params;
  const supabase = await createClient();

  const [companyResult, productResult] = await Promise.all([
    supabase.from("companies").select("company_name").eq("id", id).single(),
    supabase.from("products").select("*").eq("id", productId).single(),
  ]);

  if (!companyResult.data || !productResult.data) {
    notFound();
  }

  const product = productResult.data as Product;
  const boundUpdate = updateProduct.bind(null, id, productId);

  return (
    <div className="mx-auto max-w-2xl">
      <Link href={`/dashboard/companies/${id}`} className="mb-4 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft className="h-4 w-4" />
        Back to company
      </Link>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{companyResult.data.company_name}</p>
          <h2 className="text-xl font-bold text-gray-900">Edit product</h2>
        </div>
        <DeleteProductButton companyId={id} productId={productId} productName={product.product_name} />
      </div>

      <div className="mb-4 rounded-lg bg-gray-50 px-4 py-3 text-xs text-gray-500">
        Created {new Date(product.created_at).toLocaleString()}
        {product.created_by && <> by {product.created_by}</>}
        {" · "}
        Updated {new Date(product.updated_at).toLocaleString()}
        {product.updated_by && <> by {product.updated_by}</>}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <ProductForm companyId={id} product={product} action={boundUpdate} />
      </div>
    </div>
  );
}
