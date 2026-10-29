"use client";

import * as React from "react";
import { Button, Chip, Input } from "@heroui/react";
import {
  ArrowUpDownIcon,
  CheckCircle2Icon,
  ClockIcon,
  DownloadIcon,
  ShieldAlertIcon,
  UserIcon,
} from "lucide-react";

export interface CandidateRecord {
  id: number;
  header: string;
  type: string;
  status: string;
  target: string;
  limit: string;
  reviewer: string;
}

interface DataTableProps {
  data: CandidateRecord[];
}

export function DataTable({ data = [] }: DataTableProps) {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<"ALL" | "Done" | "In Process">("ALL");
  const [sortAsc, setSortAsc] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const pageSize = 10;

  // Filter
  const filtered = React.useMemo(() => {
    return data.filter((item) => {
      const matchSearch =
        item.header.toLowerCase().includes(search.toLowerCase()) ||
        item.type.toLowerCase().includes(search.toLowerCase()) ||
        item.reviewer.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "ALL" || item.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [data, search, statusFilter]);

  // Sort
  const sorted = React.useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortAsc) {
        return a.id - b.id;
      }
      return b.id - a.id;
    });
  }, [filtered, sortAsc]);

  // Paginate
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginated = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, currentPage, pageSize]);

  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Candidate Name",
      "Test Type",
      "Status",
      "Scaled Score",
      "Violations",
      "CEFR Band",
    ];
    const rows = sorted.map((r) => [
      r.id,
      `"${r.header.replace(/"/g, '""')}"`,
      `"${r.type}"`,
      r.status,
      r.target,
      r.limit,
      r.reviewer,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `lyxis_candidates_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search candidates or CEFR..."
            className="w-full text-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg border bg-surface p-1">
            {(["ALL", "Done", "In Process"] as const).map((filter) => (
              <Button
                key={filter}
                size="sm"
                variant={statusFilter === filter ? "primary" : "ghost"}
                onPress={() => {
                  setStatusFilter(filter);
                  setPage(1);
                }}
                className="h-7 text-xs px-2.5"
              >
                {filter === "ALL" ? "All" : filter}
              </Button>
            ))}
          </div>

          <Button
            size="sm"
            variant="outline"
            onPress={() => setSortAsc(!sortAsc)}
            className="h-8 gap-1 text-xs"
          >
            <ArrowUpDownIcon className="size-3.5" />
            {sortAsc ? "Oldest" : "Newest"}
          </Button>

          <Button
            size="sm"
            variant="outline"
            onPress={handleExportCSV}
            className="h-8 gap-1 text-xs"
          >
            <DownloadIcon className="size-3.5" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border bg-surface">
        <table className="w-full text-left text-xs">
          <thead className="border-b bg-surface-secondary text-muted-foreground">
            <tr>
              <th className="py-3 px-4 font-semibold w-12">#</th>
              <th className="py-3 px-4 font-semibold">Candidate</th>
              <th className="py-3 px-4 font-semibold">Assessment</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold">Scaled Score</th>
              <th className="py-3 px-4 font-semibold">Integrity / Blurs</th>
              <th className="py-3 px-4 font-semibold">Proficiency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-separator">
            {paginated.length > 0 ? (
              paginated.map((item) => (
                <tr key={item.id} className="hover:bg-surface-secondary/50 transition-colors">
                  <td className="py-3 px-4 font-mono text-muted-foreground">{item.id}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 font-medium text-foreground">
                      <div className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <UserIcon className="size-3.5" />
                      </div>
                      <span>{item.header}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{item.type}</td>
                  <td className="py-3 px-4">
                    {item.status === "Done" ? (
                      <Chip
                        variant="soft"
                        size="sm"
                        className="gap-1 text-emerald-600 dark:text-emerald-400"
                      >
                        <CheckCircle2Icon className="size-3" />
                        Done
                      </Chip>
                    ) : (
                      <Chip
                        variant="soft"
                        size="sm"
                        className="gap-1 text-amber-600 dark:text-amber-400"
                      >
                        <ClockIcon className="size-3" />
                        In Process
                      </Chip>
                    )}
                  </td>
                  <td className="py-3 px-4 font-semibold">
                    {item.target !== "—" ? (
                      <span className="text-primary font-bold">{item.target}</span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {item.limit.includes("0") ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                        0 violations
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-rose-500 font-medium">
                        <ShieldAlertIcon className="size-3" />
                        {item.limit}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-medium">{item.reviewer}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-12 text-center text-muted-foreground">
                  No candidate evaluation records found matching current query.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <span>
          Showing {paginated.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to{" "}
          {Math.min(currentPage * pageSize, sorted.length)} of {sorted.length} candidate sessions
        </span>
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="outline"
            isDisabled={currentPage <= 1}
            onPress={() => setPage((p) => Math.max(1, p - 1))}
            className="h-7 text-xs px-2.5"
          >
            Previous
          </Button>
          <span className="px-2 font-medium text-foreground">
            {currentPage} / {totalPages}
          </span>
          <Button
            size="sm"
            variant="outline"
            isDisabled={currentPage >= totalPages}
            onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="h-7 text-xs px-2.5"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
