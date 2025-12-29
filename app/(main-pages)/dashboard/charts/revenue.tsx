"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export function RevenueChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data}>
        <CartesianGrid vertical={false} stroke="hsl(var(--muted))" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Area
          dataKey="revenue"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary) / 0.2)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
