// app/dashboard/charts/qc-result.tsx
"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

type QCData = {
  result: string;
  value: number;
};

const COLORS = {
  Pass: "hsl(var(--success, 142 76% 36%))",
  Fail: "hsl(var(--destructive))",
};

export function QCResultChart({ data = [] }: { data?: QCData[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!data.length) {
    return (
      <div className="flex h-[280px] items-center justify-center text-sm text-muted-foreground">
        No QC data available
      </div>
    );
  }

  const total = data.reduce((sum, d) => sum + d.value, 0);
  const pass = data.find((d) => d.result === "Pass")?.value ?? 0;
  const passRate = total ? Math.round((pass / total) * 100) : 0;

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Tooltip
          cursor={false}
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;

            return (
              <div className="rounded-md border bg-background px-3 py-2 shadow-sm">
                <p className="text-xs font-medium text-muted-foreground">
                  {payload[0].name}
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {payload[0].value}
                </p>
              </div>
            );
          }}
        />

        <Pie
          data={data}
          dataKey="value"
          nameKey="result"
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={3}
          activeIndex={activeIndex ?? undefined}
          activeOuterRadius={95}
          onMouseEnter={(_, index) => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          {data.map((entry, index) => (
            <Cell
              key={entry.result}
              fill={COLORS[entry.result as keyof typeof COLORS]}
              opacity={activeIndex === null || activeIndex === index ? 1 : 0.35}
            />
          ))}
        </Pie>

        {/* Center label */}
        <text
          x="50%"
          y="48%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-foreground text-xl font-bold"
        >
          {passRate}%
        </text>
        <text
          x="50%"
          y="56%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-muted-foreground text-xs"
        >
          Pass Rate
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
}
