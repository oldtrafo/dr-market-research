"use client";

import { useActionState } from "react";
import { login } from "@/lib/actions/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { ActionState } from "@/lib/types";

export function LoginForm() {
  const [state, action, pending] = useActionState<ActionState, FormData>(login, {});

  return (
    <form action={action} className="space-y-4">
      {state.error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
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
        placeholder="••••••••"
        required
      />
      <Button type="submit" loading={pending} className="w-full">
        Sign in
      </Button>
    </form>
  );
}
