"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { noteSchema } from "@/lib/schemas/note";
import type { ActionState } from "@/lib/types";

export async function createNote(
  companyId: string,
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = noteSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { error } = await supabase.from("notes").insert({
    ...parsed.data,
    company_id: companyId,
    created_by: user?.email ?? null,
    updated_by: user?.email ?? null,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/dashboard/companies/${companyId}`);
  return { success: true };
}

export async function deleteNote(companyId: string, noteId: string): Promise<ActionState> {
  const supabase = await createClient();
  const { error } = await supabase.from("notes").delete().eq("id", noteId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/dashboard/companies/${companyId}`);
  return { success: true };
}
