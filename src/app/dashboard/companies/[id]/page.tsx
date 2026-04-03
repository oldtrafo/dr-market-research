import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CompanyForm } from "@/components/companies/company-form";
import { DeleteButton } from "@/components/companies/delete-button";
import { ProductCard } from "@/components/products/product-card";
import { NotesSection } from "@/components/notes/notes-section";
import { updateCompany } from "@/lib/actions/companies";
import { Button } from "@/components/ui/button";
import type { Company, Product, Note } from "@/lib/types";
import { Plus, Package, ArrowLeft } from "lucide-react";

export const metadata = { title: "Company Detail — DR Market Research" };

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function CompanyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const [companyResult, productsResult, notesResult] = await Promise.all([
    supabase.from("companies").select("*").eq("id", id).single(),
    supabase.from("products").select("*").eq("company_id", id).order("created_at", { ascending: false }),
    supabase.from("notes").select("*").eq("company_id", id).order("created_at", { ascending: false }),
  ]);

  if (companyResult.error || !companyResult.data) {
    notFound();
  }

  const company = companyResult.data as Company;
  const products = (productsResult.data ?? []) as Product[];
  const notes = (notesResult.data ?? []) as Note[];
  const boundUpdate = updateCompany.bind(null, id);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft className="h-4 w-4" />
        Back to dashboard
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{company.company_name}</h2>
          <p className="text-sm text-gray-500">
            Created {new Date(company.created_at).toLocaleDateString()}
            {company.created_by && <> by {company.created_by}</>}
            {" · "}
            Updated {new Date(company.updated_at).toLocaleDateString()}
            {company.updated_by && <> by {company.updated_by}</>}
          </p>
        </div>
        <DeleteButton companyId={id} companyName={company.company_name} />
      </div>

      {/* Edit form */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-base font-semibold text-gray-900">Company details</h3>
        <CompanyForm company={company} action={boundUpdate} />
      </div>

      {/* Products section */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-gray-400" />
            <h3 className="text-base font-semibold text-gray-900">Products</h3>
            <span className="text-sm text-gray-400">({products.length})</span>
          </div>
          <Link href={`/dashboard/companies/${id}/products/new`}>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              Add product
            </Button>
          </Link>
        </div>
        {products.length > 0 ? (
          <div className="space-y-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} companyId={id} />
            ))}
          </div>
        ) : (
          <p className="py-6 text-center text-sm text-gray-400">
            No products yet. Add the first one.
          </p>
        )}
      </div>

      {/* Notes section */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <NotesSection companyId={id} notes={notes} />
      </div>
    </div>
  );
}
