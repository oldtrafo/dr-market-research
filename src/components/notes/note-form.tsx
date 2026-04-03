"use client";

import { useActionState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { ActionState } from "@/lib/types";

type NoteFormProps = {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
};

export function NoteForm({ action }: NoteFormProps) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(action, {});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
      {state.error && (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</div>
      )}
      <Input
        id="title"
        name="title"
        placeholder="Note title"
        required
      />
      <Textarea
        id="content"
        name="content"
        placeholder="Write your note..."
        rows={3}
        required
      />
      <div className="flex justify-end">
        <Button type="submit" size="sm" loading={pending}>
          Add note
        </Button>
      </div>
    </form>
  );
}
