import type React from "react";

export default function DashboardLayout({
  children,
  metrics,
}: {
  children: React.ReactNode;
  metrics?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {metrics}
      <div className="flex-1">{children}</div>
    </div>
  );
}
