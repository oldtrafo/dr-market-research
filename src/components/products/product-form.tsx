"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Product, ActionState } from "@/lib/types";

type ProductFormProps = {
  companyId: string;
  product?: Product;
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
};

export function ProductForm({ companyId, product, action }: ProductFormProps) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(action, {});

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          id="product_name"
          name="product_name"
          label="Product name *"
          defaultValue={product?.product_name ?? ""}
          required
        />
        <Input
          id="hs_code"
          name="hs_code"
          label="HS Code"
          defaultValue={product?.hs_code ?? ""}
          placeholder="e.g. 8501.10"
        />
      </div>

      <Textarea
        id="description"
        name="description"
        label="Description"
        defaultValue={product?.description ?? ""}
        placeholder="Product description..."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          id="price_range"
          name="price_range"
          label="Price range"
          defaultValue={product?.price_range ?? ""}
          placeholder="e.g. $5–$15 per unit"
        />
        <Input
          id="min_order_quantity"
          name="min_order_quantity"
          label="Min order quantity"
          defaultValue={product?.min_order_quantity ?? ""}
          placeholder="e.g. 500 units"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          id="production_capacity"
          name="production_capacity"
          label="Production capacity"
          defaultValue={product?.production_capacity ?? ""}
          placeholder="e.g. 10,000 units/month"
        />
        <Input
          id="target_market_fit"
          name="target_market_fit"
          label="DR market fit (0–10)"
          type="number"
          step="0.1"
          min={0}
          max={10}
          defaultValue={product?.target_market_fit ?? ""}
        />
      </div>

      <Input
        id="certifications"
        name="certifications"
        label="Certifications"
        defaultValue={product?.certifications ?? ""}
        placeholder="e.g. ISO 9001, FDA, CE"
      />

      <Input
        id="image_url"
        name="image_url"
        label="Image URL"
        defaultValue={product?.image_url ?? ""}
        placeholder="https://..."
      />

      <div className="flex items-center gap-3">
        <input
          id="export_ready"
          name="export_ready"
          type="checkbox"
          defaultChecked={product?.export_ready ?? false}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="export_ready" className="text-sm font-medium text-gray-700">
          Export ready
        </label>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-6">
        <Link href={`/dashboard/companies/${companyId}`}>
          <Button variant="secondary" type="button">
            Cancel
          </Button>
        </Link>
        <Button type="submit" loading={pending}>
          {product ? "Save changes" : "Add product"}
        </Button>
      </div>
    </form>
  );
}
