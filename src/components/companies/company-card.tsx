import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Company } from "@/lib/types";
import { Calendar, Star, User, ArrowUpRight } from "lucide-react";

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

function scoreBarWidth(score: number | null): string {
  if (score === null) return "0%";
  return `${(score / 10) * 100}%`;
}

function scoreBarColor(score: number | null): string {
  if (score === null) return "bg-gray-200";
  if (score >= 7) return "bg-green-500";
  if (score >= 4) return "bg-amber-500";
  return "bg-red-500";
}

export function CompanyCard({ company }: { company: Company }) {
  return (
    <Link
      href={`/dashboard/companies/${company.id}`}
      className="group relative flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-gray-300 hover:shadow-md"
    >
      {/* Top colored accent */}
      <div className="h-1 rounded-t-xl bg-gradient-to-r from-blue-500 to-blue-600" />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-sm font-semibold text-gray-900">
                {company.company_name}
              </h3>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-gray-300 transition-colors group-hover:text-blue-500" />
            </div>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              {company.sector && <Badge variant="blue">{company.sector}</Badge>}
              {company.founded_year && (
                <span className="flex items-center gap-0.5 text-xs text-gray-400">
                  <Calendar className="h-3 w-3" />
                  {company.founded_year}
                </span>
              )}
            </div>
          </div>
          {company.score !== null && (
            <div className="flex shrink-0 flex-col items-center">
              <Badge variant={scoreBadgeVariant(company.score)}>
                <Star className="mr-0.5 h-3 w-3" />
                {company.score}
              </Badge>
            </div>
          )}
        </div>

        {company.about && (
          <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-gray-500">{company.about}</p>
        )}

        {/* Score bar */}
        {company.score !== null && (
          <div className="mt-3">
            <div className="h-1 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className={`h-full rounded-full transition-all ${scoreBarColor(company.score)}`}
                style={{ width: scoreBarWidth(company.score) }}
              />
            </div>
          </div>
        )}

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100 text-xs text-gray-400">
          <span>Updated {formatDate(company.updated_at)}</span>
          {company.created_by && (
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {company.created_by.split("@")[0]}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
