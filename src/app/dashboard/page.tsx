import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { CompanyCard } from "@/components/companies/company-card";
import { Button } from "@/components/ui/button";
import type { Company } from "@/lib/types";
import { ArrowRight, Building2, Package } from "lucide-react";

export const metadata = { title: "Dashboard — DR Market Research" };

export default async function DashboardPage() {
  const supabase = await createClient();

  const [companiesResult, productsResult, exportReadyResult] = await Promise.all([
    supabase.from("companies").select("*").order("updated_at", { ascending: false }),
    supabase.from("products").select("id, export_ready, target_market_fit"),
    supabase.from("products").select("id").eq("export_ready", true),
  ]);

  const companies = (companiesResult.data ?? []) as Company[];
  const products = productsResult.data ?? [];
  const exportReady = exportReadyResult.data ?? [];

  const scores = companies
    .map((c) => c.score)
    .filter((s): s is number => s !== null);
  const avgScore = scores.length > 0
    ? scores.reduce((a, b) => a + b, 0) / scores.length
    : null;

  const recentCompanies = companies.slice(0, 6);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Overview</h2>
        <p className="text-sm text-gray-500">Your research at a glance</p>
      </div>

      <StatsCards
        totalCompanies={companies.length}
        totalProducts={products.length}
        avgScore={avgScore}
        exportReady={exportReady.length}
      />

      {/* Recent companies */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-gray-400" />
            <h3 className="text-base font-semibold text-gray-900">Recent companies</h3>
          </div>
          <Link href="/dashboard/companies">
            <Button variant="ghost" size="sm">
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
        {recentCompanies.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border-2 border-dashed border-gray-200 px-6 py-12 text-center">
            <Building2 className="mx-auto h-10 w-10 text-gray-300" />
            <p className="mt-3 text-sm font-medium text-gray-900">No companies yet</p>
            <p className="mt-1 text-sm text-gray-500">Add your first company to get started.</p>
            <Link href="/dashboard/companies/new" className="mt-4 inline-block">
              <Button size="sm">Add company</Button>
            </Link>
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/dashboard/companies"
          className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="rounded-lg bg-blue-50 p-3">
            <Building2 className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-900">Browse Companies</h4>
            <p className="text-xs text-gray-500">Search, filter, and manage all companies</p>
          </div>
          <ArrowRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link
          href="/dashboard/products"
          className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="rounded-lg bg-purple-50 p-3">
            <Package className="h-6 w-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-900">Browse Products</h4>
            <p className="text-xs text-gray-500">Search products across all companies</p>
          </div>
          <ArrowRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
