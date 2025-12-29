// app/dashboard/charts/orders.tsx
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type OrdersData = {
  month: string; // "2023-11"
  orders: number;
};

function formatMonth(value: string) {
  const [year, month] = value.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleString("en-US", { month: "short" });
}

export function OrdersChart({ data }: { data: OrdersData[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 20, right: 16, left: 0, bottom: 0 }}>
        {/* Grid */}
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="hsl(var(--muted-foreground) / 0.15)"
        />

        {/* X Axis */}
        <XAxis
          dataKey="month"
          tickFormatter={formatMonth}
          tickLine={false}
          axisLine={false}
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
        />

        {/* Y Axis */}
        <YAxis
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
        />

        {/* Tooltip */}
        <Tooltip
          cursor={false}
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;

            return (
              <div className="rounded-md border bg-background px-3 py-2 shadow-sm">
                <p className="text-xs font-medium text-muted-foreground">
                  {formatMonth(label)}
                </p>
                <p className="text-sm font-semibold text-foreground">
                  Orders: {payload[0].value}
                </p>
              </div>
            );
          }}
        />

        {/* Bars */}
        <Bar
          dataKey="orders"
          radius={[6, 6, 0, 0]}
          fill="hsl(var(--primary))"
          animationDuration={400}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
