"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Activity } from "lucide-react";
import { Card, Button } from "@heroui/react";

interface ChartAreaInteractiveProps {
  data?: Array<{ date: string; attempts: number }>;
}

export function ChartAreaInteractive({ data = [] }: ChartAreaInteractiveProps) {
  const [timeRange, setTimeRange] = React.useState<"7d" | "30d" | "90d">("90d");

  const filteredData = React.useMemo(() => {
    if (!data.length) return [];
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") daysToSubtract = 30;
    else if (timeRange === "7d") daysToSubtract = 7;

    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - daysToSubtract);

    return data.filter((item) => new Date(item.date) >= startDate);
  }, [data, timeRange]);

  return (
    <Card>
      <Card.Header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-2">
        <div>
          <Card.Title className="text-base font-semibold">
            Candidate Assessment Throughput
          </Card.Title>
          <Card.Description className="text-xs text-muted-foreground">
            Standardized TOEFL ITP® diagnostic evaluation volume telemetry
          </Card.Description>
        </div>
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          {(["7d", "30d", "90d"] as const).map((range) => (
            <Button
              key={range}
              size="sm"
              variant={timeRange === range ? "primary" : "outline"}
              onPress={() => setTimeRange(range)}
              className="h-7 text-xs px-2.5"
            >
              {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : "90 Days"}
            </Button>
          ))}
        </div>
      </Card.Header>
      <Card.Content className="pt-4">
        {filteredData.length > 0 ? (
          <div className="h-[250px] w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="fillAttempts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent, #ff3700)" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="var(--accent, #ff3700)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--separator, #e5e7eb)"
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tick={{ fill: "var(--foreground)", opacity: 0.6, fontSize: 11 }}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload?.length) {
                      const item = payload[0].payload as { date: string; attempts: number };
                      return (
                        <div className="rounded-lg border bg-surface p-2 shadow-sm text-xs">
                          <p className="font-semibold text-foreground">
                            {new Date(item.date).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                          <p className="text-primary font-medium">
                            Sessions: <span className="font-bold">{item.attempts}</span>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  dataKey="attempts"
                  type="monotone"
                  fill="url(#fillAttempts)"
                  stroke="var(--accent, #ff3700)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[220px] border border-dashed rounded-xl bg-muted/10 p-6 text-center space-y-2">
            <Activity className="size-8 text-muted-foreground/50" />
            <p className="text-sm font-semibold text-foreground">No Assessment Telemetry Yet</p>
            <p className="text-xs text-muted-foreground max-w-sm">
              Throughput telemetry will populate in real time as candidates complete TOEFL ITP®
              diagnostic sessions.
            </p>
          </div>
        )}
      </Card.Content>
    </Card>
  );
}
