export function DRFlag({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 40"
      className={className}
      role="img"
      aria-label="Dominican Republic flag"
    >
      {/* Blue quarters */}
      <rect x="0" y="0" width="28" height="18" fill="#002D62" />
      <rect x="32" y="22" width="28" height="18" fill="#002D62" />
      {/* Red quarters */}
      <rect x="32" y="0" width="28" height="18" fill="#CE1126" />
      <rect x="0" y="22" width="28" height="18" fill="#CE1126" />
      {/* White cross */}
      <rect x="0" y="18" width="60" height="4" fill="#FFFFFF" />
      <rect x="28" y="0" width="4" height="40" fill="#FFFFFF" />
      {/* Center coat of arms (simplified) */}
      <rect x="27" y="15" width="6" height="10" rx="0.5" fill="#FFFFFF" />
      <rect x="28" y="16.5" width="4" height="7" rx="0.3" fill="#002D62" />
      <rect x="29.2" y="18" width="1.6" height="4" fill="#CE1126" />
    </svg>
  );
}
