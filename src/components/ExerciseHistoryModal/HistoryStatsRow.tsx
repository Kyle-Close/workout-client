import { Box, Stack, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import type { HistoryStats } from "./useHistoryStats";

function TrendIcon({ trend }: { trend: "up" | "down" | "flat" }) {
  if (trend === "up") {
    return <TrendingUpIcon sx={{ fontSize: 18, color: "success.main" }} />;
  }
  if (trend === "down") {
    return <TrendingDownIcon sx={{ fontSize: 18, color: "error.main" }} />;
  }
  return <TrendingFlatIcon sx={{ fontSize: 18, color: "text.secondary" }} />;
}

interface HistoryStatsRowProps {
  stats: HistoryStats;
}

export function HistoryStatsRow({ stats }: HistoryStatsRowProps) {
  const trendColor =
    stats.trend === "up"
      ? "success.main"
      : stats.trend === "down"
        ? "error.main"
        : "text.secondary";

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        mb: 3,
        p: 1.5,
        borderRadius: "10px",
        bgcolor: "rgba(255,255,255,0.03)",
      }}
    >
      <Box sx={{ flex: 1, textAlign: "center" }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
        >
          Current
        </Typography>
        <Typography fontWeight={600} fontSize="1.1rem" color="primary.main">
          {stats.currentWeight}
        </Typography>
      </Box>

      <Box sx={{ width: "1px", bgcolor: "rgba(255,255,255,0.1)", alignSelf: "stretch" }} />

      <Box sx={{ flex: 1, textAlign: "center" }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
        >
          Trend
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="center" gap={0.5}>
          <TrendIcon trend={stats.trend} />
          <Typography fontWeight={600} fontSize="1.1rem" color={trendColor}>
            {stats.trendAmount > 0 ? "+" : ""}
            {stats.trendAmount}
          </Typography>
        </Stack>
      </Box>

      <Box sx={{ width: "1px", bgcolor: "rgba(255,255,255,0.1)", alignSelf: "stretch" }} />

      <Box sx={{ flex: 1, textAlign: "center" }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
        >
          Range
        </Typography>
        <Typography fontWeight={600} fontSize="1.1rem">
          {stats.minWeight}-{stats.maxWeight}
        </Typography>
      </Box>
    </Stack>
  );
}
