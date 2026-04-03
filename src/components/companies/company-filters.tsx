"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { SECTORS } from "@/lib/schemas/company";
import { Search } from "lucide-react";

const sortOptions = [
  { value: "created_at:desc", label: "Newest first" },
  { value: "created_at:asc", label: "Oldest first" },
  { value: "company_name:asc", label: "Name A–Z" },
  { value: "company_name:desc", label: "Name Z–A" },
  { value: "score:desc", label: "Highest score" },
  { value: "score:asc", label: "Lowest score" },
  { value: "founded_year:desc", label: "Founded newest" },
  { value: "founded_year:asc", label: "Founded oldest" },
];

const sectorOptions = SECTORS.map((s) => ({ value: s, label: s }));

export function CompanyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/dashboard?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search companies..."
          defaultValue={searchParams.get("q") ?? ""}
          onChange={(e) => updateParam("q", e.target.value)}
          className="pl-9"
        />
      </div>
      <Select
        options={sectorOptions}
        placeholder="All sectors"
        value={searchParams.get("sector") ?? ""}
        onChange={(e) => updateParam("sector", e.target.value)}
        className="sm:w-48"
      />
      <Select
        options={sortOptions}
        value={searchParams.get("sort") ?? "created_at:desc"}
        onChange={(e) => updateParam("sort", e.target.value)}
        className="sm:w-48"
      />
    </div>
  );
}
