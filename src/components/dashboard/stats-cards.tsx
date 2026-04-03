import { Building2, Package, Star, CheckCircle } from "lucide-react";

type StatsProps = {
  totalCompanies: number;
  totalProducts: number;
  avgScore: number | null;
  exportReady: number;
};

const stats = (p: StatsProps) => [
  { label: "Companies", value: p.totalCompanies, icon: Building2, color: "text-blue-600 bg-blue-50" },
  { label: "Products", value: p.totalProducts, icon: Package, color: "text-purple-600 bg-purple-50" },
  { label: "Avg Score", value: p.avgScore !== null ? p.avgScore.toFixed(1) : "—", icon: Star, color: "text-amber-600 bg-amber-50" },
  { label: "Export Ready", value: p.exportReady, icon: CheckCircle, color: "text-green-600 bg-green-50" },
];

export function StatsCards(props: StatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats(props).map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-gray-400">{label}</span>
            <div className={`rounded-lg p-1.5 ${color}`}>
              <Icon className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
        </div>
      ))}
    </div>
  );
}
