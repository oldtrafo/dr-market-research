import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProductForm } from "@/components/products/product-form";
import { createProduct } from "@/lib/actions/products";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "Add Product — DR Market Research" };

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function NewProductPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: company } = await supabase
    .from("companies")
    .select("company_name")
    .eq("id", id)
    .single();

  if (!company) {
    notFound();
  }

  const boundCreate = createProduct.bind(null, id);

  return (
    <div className="mx-auto max-w-2xl">
      <Link href={`/dashboard/companies/${id}`} className="mb-4 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft className="h-4 w-4" />
        Back to company
      </Link>
      <div className="mb-6">
        <p className="text-sm text-gray-500">Adding product to</p>
        <h2 className="text-xl font-bold text-gray-900">{company.company_name}</h2>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <ProductForm companyId={id} action={boundCreate} />
      </div>
    </div>
  );
}
