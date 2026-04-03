import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";
import { DRFlag } from "@/components/ui/dr-flag";

export async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2.5 lg:hidden">
          <DRFlag className="h-5 w-auto rounded-sm shadow-sm" />
          <span className="text-sm font-bold text-gray-900">DR Market Research</span>
        </div>
        <div className="hidden lg:block" />
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 sm:flex">
            <div className="h-7 w-7 rounded-full bg-blue-100 flex items-center justify-center text-xs font-semibold text-blue-700">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm text-gray-600">{user?.email}</span>
          </div>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
