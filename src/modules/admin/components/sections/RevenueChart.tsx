"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useRevenue } from "../../hooks/queries/use-revenue";

type CustomTooltipProps = {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
};

const formatYAxis = (value: number) => {
  if (value === 0) return "$0k";
  return `$${(value / 1000).toFixed(1)}k`;
};

const formatTooltipValue = (value: number) => `$${value.toLocaleString()}`;

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-5 py-4">
        <p className="text-gray-800 font-semibold text-base mb-1">{label}</p>
        <p className="text-teal-500 font-medium text-sm">
          Revenue : {formatTooltipValue(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export default function RevenueOverview() {
  const { data } = useRevenue();
  console.log(data);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Revenue Overview</h2>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart
          data={data?.data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#e5e7eb"
            vertical={false}
          />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 13 }}
            dy={8}
          />

          <YAxis
            tickFormatter={formatYAxis}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 13 }}
            dx={-8}
            domain={[0, 14000]}
            ticks={[0, 3500, 7000, 10500, 14000]}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "#2dd4bf",
              strokeWidth: 1,
              strokeDasharray: "4 4",
            }}
          />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#2dd4bf"
            strokeWidth={2.5}
            fill="url(#revenueGradient)"
            dot={false}
            activeDot={{ r: 5, fill: "#2dd4bf", strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
