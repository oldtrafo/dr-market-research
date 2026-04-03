import Link from "next/link";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { CompanyFilters } from "@/components/companies/company-filters";
import { CompanyList } from "@/components/companies/company-list";
import { EmptyState } from "@/components/layout/empty-state";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Plus } from "lucide-react";
import type { Company } from "@/lib/types";

export const metadata = { title: "Companies — DR Market Research" };

type SearchParams = Promise<{
  q?: string;
  sector?: string;
  sort?: string;
}>;

async function Companies({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const supabase = await createClient();

  let query = supabase.from("companies").select("*");

  if (params.q) {
    query = query.ilike("company_name", `%${params.q}%`);
  }

  if (params.sector) {
    query = query.eq("sector", params.sector);
  }

  const [sortField, sortDir] = (params.sort ?? "created_at:desc").split(":");
  query = query.order(sortField, { ascending: sortDir === "asc", nullsFirst: false });

  const { data: companies, error } = await query;

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
        Failed to load companies: {error.message}
      </div>
    );
  }

  if (!companies || companies.length === 0) {
    return (
      <EmptyState
        title="No companies found"
        description="Add your first company to get started with your research."
        action={
          <Link href="/dashboard/companies/new">
            <Button>
              <Plus className="h-4 w-4" />
              Add company
            </Button>
          </Link>
        }
      />
    );
  }

  return (
    <>
      <p className="text-sm text-gray-500">{companies.length} {companies.length === 1 ? "company" : "companies"}</p>
      <CompanyList companies={companies as Company[]} />
    </>
  );
}

export default async function CompaniesPage(props: { searchParams: SearchParams }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-gray-900">Companies</h2>
        <Link href="/dashboard/companies/new">
          <Button>
            <Plus className="h-4 w-4" />
            Add company
          </Button>
        </Link>
      </div>

      <Suspense>
        <CompanyFilters basePath="/dashboard/companies" />
      </Suspense>

      <Suspense
        fallback={
          <div className="flex justify-center py-12">
            <Spinner className="h-8 w-8" />
          </div>
        }
      >
        <Companies searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}
