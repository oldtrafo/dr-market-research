import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/types";
import { CheckCircle, XCircle, ArrowUpRight } from "lucide-react";

type ProductWithCompany = Product & { companies: { company_name: string } | null };

export function ProductTableRow({ product }: { product: ProductWithCompany }) {
  const companyName = product.companies?.company_name ?? "Unknown";

  return (
    <Link
      href={`/dashboard/companies/${product.company_id}/products/${product.id}`}
      className="group flex items-center gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 transition-all hover:border-gray-300 hover:shadow-sm"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h4 className="truncate text-sm font-semibold text-gray-900">{product.product_name}</h4>
          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-gray-300 transition-colors group-hover:text-blue-500" />
        </div>
        <p className="mt-0.5 truncate text-xs text-gray-500">{companyName}</p>
      </div>

      <div className="hidden items-center gap-3 sm:flex">
        {product.hs_code && (
          <span className="whitespace-nowrap rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
            HS: {product.hs_code}
          </span>
        )}
        {product.price_range && (
          <span className="whitespace-nowrap text-xs text-gray-500">{product.price_range}</span>
        )}
      </div>

      {product.target_market_fit !== null && (
        <Badge
          variant={product.target_market_fit >= 7 ? "green" : product.target_market_fit >= 4 ? "yellow" : "red"}
        >
          Fit: {product.target_market_fit}
        </Badge>
      )}

      {product.export_ready ? (
        <Badge variant="green">
          <CheckCircle className="mr-0.5 h-3 w-3" />
          Export
        </Badge>
      ) : (
        <Badge variant="default">
          <XCircle className="mr-0.5 h-3 w-3" />
          Not ready
        </Badge>
      )}
    </Link>
  );
}
