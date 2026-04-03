import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { DRFlag } from "@/components/ui/dr-flag";
import { WaveHero } from "@/components/layout/wave-hero";
import { ArrowRight, Building2, Search, Shield } from "lucide-react";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen">
      {/* Hero with wave background */}
      <div className="relative min-h-[85vh] overflow-hidden">
        <WaveHero />

        {/* Content on top of waves */}
        <div className="relative z-10">
          {/* Nav */}
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
            <div className="flex items-center gap-2.5">
              <DRFlag className="h-6 w-auto rounded-sm shadow-sm" />
              <span className="text-lg font-bold text-white">DR Market Research</span>
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <Link href="/dashboard">
                  <Button size="sm">
                    Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
                      Sign in
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm">Get started</Button>
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Hero text */}
          <section className="mx-auto max-w-6xl px-6 pb-24 pt-20 text-center sm:pt-32">
            <div className="mx-auto max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
                <DRFlag className="h-3.5 w-auto rounded-sm" />
                Dominican Republic Market Intelligence
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                Research companies.
                <br />
                <span className="text-blue-300">Make better decisions.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-lg text-white/60">
                A centralized platform for your team to track, evaluate, and manage company research
                across the Dominican Republic market.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <Link href={user ? "/dashboard" : "/signup"}>
                  <Button size="lg">
                    {user ? "Go to dashboard" : "Get started"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                {!user && (
                  <Link href="/login">
                    <Button variant="secondary" size="lg" className="border border-white/20 bg-white/10 text-white hover:bg-white/20">
                      Sign in
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-gray-400">
            What you can do
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            <FeatureCard
              icon={<Building2 className="h-6 w-6 text-blue-600" />}
              title="Track companies"
              description="Add and manage detailed profiles for companies in the DR market — sectors, products, contacts, and scores."
            />
            <FeatureCard
              icon={<Search className="h-6 w-6 text-blue-600" />}
              title="Search & filter"
              description="Quickly find companies by name, filter by sector, and sort by score or founding year."
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6 text-blue-600" />}
              title="Team access"
              description="Invite your team with secure email/password accounts. Everyone sees the same data in real time."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50 py-8 text-center text-sm text-gray-400">
        DR Market Research &middot; Internal tool
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-4 inline-flex rounded-lg bg-blue-50 p-2.5">{icon}</div>
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-500">{description}</p>
    </div>
  );
}
