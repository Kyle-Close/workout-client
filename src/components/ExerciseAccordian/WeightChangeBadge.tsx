import { Stack, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

interface WeightChangeBadgeProps {
  weightChange: number;
}

export function WeightChangeBadge({ weightChange }: WeightChangeBadgeProps) {
  if (weightChange === 0) return null;

  const isPositive = weightChange > 0;

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0.25}
      sx={{
        px: 0.75,
        py: 0.25,
        borderRadius: "6px",
        bgcolor: isPositive ? "rgba(46, 125, 50, 0.15)" : "rgba(211, 47, 47, 0.15)",
      }}
    >
      {isPositive ? (
        <TrendingUpIcon sx={{ fontSize: 14, color: "success.main" }} />
      ) : (
        <TrendingDownIcon sx={{ fontSize: 14, color: "error.main" }} />
      )}
      <Typography
        sx={{
          fontSize: "0.7rem",
          fontWeight: 600,
          color: isPositive ? "success.main" : "error.main",
        }}
      >
        {Math.abs(weightChange)}
      </Typography>
    </Stack>
  );
}
