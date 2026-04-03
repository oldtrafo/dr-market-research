"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SECTORS } from "@/lib/schemas/company";
import type { Company, ActionState } from "@/lib/types";

const sectorOptions = SECTORS.map((s) => ({ value: s, label: s }));

type CompanyFormProps = {
  company?: Company;
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
};

export function CompanyForm({ company, action }: CompanyFormProps) {
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
          id="company_name"
          name="company_name"
          label="Company name *"
          defaultValue={company?.company_name ?? ""}
          required
        />
        <Input
          id="founded_year"
          name="founded_year"
          label="Founded year"
          type="number"
          defaultValue={company?.founded_year ?? ""}
          min={1800}
          max={new Date().getFullYear()}
        />
      </div>

      <Textarea
        id="about"
        name="about"
        label="About"
        defaultValue={company?.about ?? ""}
        placeholder="Brief description of the company..."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <Select
          id="sector"
          name="sector"
          label="Sector"
          options={sectorOptions}
          placeholder="Select a sector"
          defaultValue={company?.sector ?? ""}
        />
        <Input
          id="score"
          name="score"
          label="Score (0–10)"
          type="number"
          step="0.1"
          min={0}
          max={10}
          defaultValue={company?.score ?? ""}
        />
      </div>

      <Textarea
        id="products"
        name="products"
        label="Products"
        defaultValue={company?.products ?? ""}
        placeholder="Main products or services..."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          id="factory"
          name="factory"
          label="Factory / Facilities"
          defaultValue={company?.factory ?? ""}
        />
        <Input
          id="contact"
          name="contact"
          label="Contact"
          defaultValue={company?.contact ?? ""}
          placeholder="Email, phone, or website"
        />
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-6">
        <Link href="/dashboard">
          <Button variant="secondary" type="button">
            Cancel
          </Button>
        </Link>
        <Button type="submit" loading={pending}>
          {company ? "Save changes" : "Add company"}
        </Button>
      </div>
    </form>
  );
}
