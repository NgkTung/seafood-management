"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
  Cell,
} from "recharts";

type StorageData = {
  location: string;
  utilization: number;
  used: number;
  capacity: number;
};

function getUtilizationColor(value: number) {
  if (value >= 85) return "hsl(var(--destructive))"; // critical
  if (value >= 65) return "hsl(38 92% 50%)"; // warning
  return "hsl(var(--success, 142 76% 36%))"; // healthy
}

export function StorageUtilizationChart({ data }: { data: StorageData[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 8, right: 24, left: 24, bottom: 8 }}
      >
        {/* Grid */}
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal={false}
          stroke="hsl(var(--muted-foreground) / 0.15)"
        />

        {/* X Axis (percentage) */}
        <XAxis
          type="number"
          domain={[0, 100]}
          tickFormatter={(v) => `${v}%`}
          tickLine={false}
          axisLine={false}
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
        />

        {/* Y Axis (locations) */}
        <YAxis
          type="category"
          dataKey="location"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
          width={100}
        />

        {/* Tooltip */}
        <Tooltip
          cursor={false}
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;

            const d = payload[0].payload;

            return (
              <div className="rounded-md border bg-background px-3 py-2 shadow-sm">
                <p className="text-sm font-semibold text-foreground">
                  {d.location}
                </p>
                <p className="text-xs text-muted-foreground">
                  Used: {d.used} / {d.capacity}
                </p>
                <p className="text-sm font-medium">{d.utilization}%</p>
              </div>
            );
          }}
        />

        {/* Bar */}
        <Bar
          dataKey="utilization"
          radius={[0, 6, 6, 0]}
          animationDuration={400}
        >
          <LabelList
            dataKey="utilization"
            position="right"
            formatter={(v: number) => `${v}%`}
            className="fill-muted-foreground text-xs"
          />
          {data.map((entry, index) => (
            <Cell key={index} fill={getUtilizationColor(entry.utilization)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
