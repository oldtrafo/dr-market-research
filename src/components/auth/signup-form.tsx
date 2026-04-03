"use client";

import { useActionState } from "react";
import { signup } from "@/lib/actions/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { ActionState } from "@/lib/types";

export function SignupForm() {
  const [state, action, pending] = useActionState<ActionState, FormData>(signup, {});

  return (
    <form action={action} className="space-y-4">
      {state.error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}
      {state.success && (
        <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
          Check your email for a confirmation link.
        </div>
      )}
      <Input
        id="email"
        name="email"
        type="email"
        label="Email"
        placeholder="you@example.com"
        required
      />
      <Input
        id="password"
        name="password"
        type="password"
        label="Password"
        placeholder="At least 6 characters"
        minLength={6}
        required
      />
      <Button type="submit" loading={pending} className="w-full">
        Create account
      </Button>
    </form>
  );
}
