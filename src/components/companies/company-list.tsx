import { CompanyCard } from "./company-card";
import type { Company } from "@/lib/types";

export function CompanyList({ companies }: { companies: Company[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
}
