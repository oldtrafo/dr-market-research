"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Search } from "lucide-react";

const sortOptions = [
  { value: "created_at:desc", label: "Newest first" },
  { value: "created_at:asc", label: "Oldest first" },
  { value: "product_name:asc", label: "Name A–Z" },
  { value: "product_name:desc", label: "Name Z–A" },
  { value: "target_market_fit:desc", label: "Best market fit" },
  { value: "target_market_fit:asc", label: "Lowest market fit" },
];

const exportOptions = [
  { value: "true", label: "Export ready" },
  { value: "false", label: "Not ready" },
];

export function ProductFilters() {
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
      router.push(`/dashboard/products?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search products..."
          defaultValue={searchParams.get("q") ?? ""}
          onChange={(e) => updateParam("q", e.target.value)}
          className="pl-9"
        />
      </div>
      <Select
        options={exportOptions}
        placeholder="All statuses"
        value={searchParams.get("export") ?? ""}
        onChange={(e) => updateParam("export", e.target.value)}
        className="sm:w-44"
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
