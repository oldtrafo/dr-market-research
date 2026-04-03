"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { productSchema } from "@/lib/schemas/product";
import type { ActionState } from "@/lib/types";

export async function createProduct(
  companyId: string,
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = productSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { error } = await supabase.from("products").insert({
    ...parsed.data,
    company_id: companyId,
    created_by: user?.email ?? null,
    updated_by: user?.email ?? null,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/dashboard/companies/${companyId}`);
  redirect(`/dashboard/companies/${companyId}`);
}

export async function updateProduct(
  companyId: string,
  productId: string,
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = productSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("products")
    .update({
      ...parsed.data,
      updated_by: user?.email ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", productId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/dashboard/companies/${companyId}`);
  redirect(`/dashboard/companies/${companyId}`);
}

export async function deleteProduct(companyId: string, productId: string): Promise<ActionState> {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", productId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/dashboard/companies/${companyId}`);
  redirect(`/dashboard/companies/${companyId}`);
}
