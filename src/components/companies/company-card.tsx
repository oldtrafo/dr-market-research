import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Company } from "@/lib/types";
import { Calendar, Star, User } from "lucide-react";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function scoreBadgeVariant(score: number | null): "green" | "yellow" | "red" | "default" {
  if (score === null) return "default";
  if (score >= 7) return "green";
  if (score >= 4) return "yellow";
  return "red";
}

export function CompanyCard({ company }: { company: Company }) {
  return (
    <Link
      href={`/dashboard/companies/${company.id}`}
      className="block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-gray-900">
            {company.company_name}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {company.sector && <Badge variant="blue">{company.sector}</Badge>}
            {company.founded_year && (
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar className="h-3 w-3" />
                {company.founded_year}
              </span>
            )}
          </div>
        </div>
        {company.score !== null && (
          <Badge variant={scoreBadgeVariant(company.score)}>
            <Star className="mr-0.5 h-3 w-3" />
            {company.score}
          </Badge>
        )}
      </div>

      {company.about && (
        <p className="mt-3 line-clamp-2 text-sm text-gray-600">{company.about}</p>
      )}

      <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
        <span>Updated {formatDate(company.updated_at)}</span>
        {company.created_by && (
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {company.created_by}
          </span>
        )}
      </div>
    </Link>
  );
}
