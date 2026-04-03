import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";
import { DRFlag } from "@/components/ui/dr-flag";

export async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2.5">
          <DRFlag className="h-5 w-auto rounded-sm shadow-sm" />
          <h1 className="text-lg font-bold text-gray-900">DR Market Research</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-gray-500 sm:inline">{user?.email}</span>
          <DRFlag className="h-6 w-auto rounded-sm shadow-sm sm:hidden" />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
