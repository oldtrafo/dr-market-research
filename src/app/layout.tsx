import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DR Market Research",
  description: "Dominican Republic market research management",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
