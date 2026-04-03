import Link from "next/link";
import { CompanyForm } from "@/components/companies/company-form";
import { createCompany } from "@/lib/actions/companies";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "Add Company — DR Market Research" };

export default function NewCompanyPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/dashboard" className="mb-4 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft className="h-4 w-4" />
        Back to dashboard
      </Link>
      <h2 className="mb-6 text-xl font-bold text-gray-900">Add company</h2>
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <CompanyForm action={createCompany} />
      </div>
    </div>
  );
}
