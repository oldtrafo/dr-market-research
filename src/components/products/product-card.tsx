import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/types";
import { Package, CheckCircle, XCircle } from "lucide-react";

export function ProductCard({ product, companyId }: { product: Product; companyId: string }) {
  return (
    <Link
      href={`/dashboard/companies/${companyId}/products/${product.id}`}
      className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
        <Package className="h-5 w-5 text-gray-500" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h4 className="truncate text-sm font-semibold text-gray-900">{product.product_name}</h4>
          <div className="flex shrink-0 items-center gap-2">
            {product.target_market_fit !== null && (
              <Badge variant={product.target_market_fit >= 7 ? "green" : product.target_market_fit >= 4 ? "yellow" : "red"}>
                Fit: {product.target_market_fit}
              </Badge>
            )}
            {product.export_ready ? (
              <Badge variant="green"><CheckCircle className="mr-0.5 h-3 w-3" />Export</Badge>
            ) : (
              <Badge variant="default"><XCircle className="mr-0.5 h-3 w-3" />Not ready</Badge>
            )}
          </div>
        </div>
        {product.description && (
          <p className="mt-1 line-clamp-1 text-xs text-gray-500">{product.description}</p>
        )}
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
          {product.hs_code && <span>HS: {product.hs_code}</span>}
          {product.price_range && <span>{product.price_range}</span>}
          {product.min_order_quantity && <span>MOQ: {product.min_order_quantity}</span>}
        </div>
      </div>
    </Link>
  );
}
