import { Box } from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import type { ExerciseHistoryEntry } from "../../schemas/exerciseHistorySchema";
import { ChartTooltip } from "./ChartTooltip";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

interface HistoryChartProps {
  history: ExerciseHistoryEntry[];
  avgWeight: number;
}

export function HistoryChart({ history, avgWeight }: HistoryChartProps) {
  return (
    <Box sx={{ width: "100%", height: 250 }}>
      <ResponsiveContainer>
        <LineChart data={history} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.06)"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            tickLine={false}
            dy={8}
          />
          <YAxis
            domain={[
              (dataMin: number) => Math.floor(dataMin * 0.95),
              (dataMax: number) => Math.ceil(dataMax * 1.05),
            ]}
            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip content={<ChartTooltip />} />
          <ReferenceLine y={avgWeight} stroke="rgba(144, 202, 249, 0.3)" strokeDasharray="5 5" />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#90caf9"
            strokeWidth={2}
            dot={{ fill: "#90caf9", strokeWidth: 0, r: 4 }}
            activeDot={{ fill: "#90caf9", strokeWidth: 2, stroke: "#fff", r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
