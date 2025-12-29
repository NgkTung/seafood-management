// app/dashboard/charts/stock-by-location.tsx
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { useState } from "react";

type StockData = {
  location: string;
  quantity: number;
};

const COLORS = [
  "hsl(var(--primary))",
  "hsl(220 90% 60%)",
  "hsl(160 70% 45%)",
  "hsl(40 90% 55%)",
  "hsl(280 70% 60%)",
  "hsl(0 80% 60%)",
];

export function StockByLocationChart({ data }: { data: StockData[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={data}
        margin={{ top: 16, right: 16, left: 0, bottom: 8 }}
        onMouseLeave={() => setActiveIndex(null)}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="hsl(var(--muted-foreground) / 0.15)"
        />

        <XAxis
          dataKey="location"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
        />

        <Tooltip
          cursor={false}
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;

            return (
              <div className="rounded-md border bg-background px-3 py-2 shadow-sm">
                <p className="text-xs font-medium text-muted-foreground">
                  {label}
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {payload[0].value}
                </p>
              </div>
            );
          }}
        />

        <Bar
          dataKey="quantity"
          radius={[6, 6, 0, 0]}
          onMouseEnter={(_, index) => setActiveIndex(index)}
          animationDuration={400}
        >
          {data.map((_, index) => {
            const baseColor = COLORS[index % COLORS.length];

            return (
              <Cell
                key={index}
                fill={baseColor}
                opacity={
                  activeIndex === null || activeIndex === index ? 1 : 0.3
                }
              />
            );
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
