import { Box, Stack, Typography } from "@mui/material";
import type { ExerciseHistoryEntry } from "../../schemas/exerciseHistorySchema";

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: ExerciseHistoryEntry }>;
}

export function ChartTooltip({ active, payload }: ChartTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  const date = new Date(data.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const hitTarget = data.sets_completed !== null && data.sets_completed >= data.target_sets;

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: 1,
        borderColor: "rgba(255,255,255,0.15)",
        borderRadius: "8px",
        p: 1.5,
        boxShadow: 3,
      }}
    >
      <Typography fontSize="0.8rem" color="text.secondary" sx={{ mb: 0.5 }}>
        {formattedDate}
      </Typography>
      <Typography fontSize="1.1rem" fontWeight={600} color="primary.main">
        {data.weight} lbs
      </Typography>
      <Stack direction="row" gap={2} mt={0.75}>
        <Typography variant="caption" color={hitTarget ? "success.main" : "error.main"}>
          Sets: {data.sets_completed ?? "—"}/{data.target_sets}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          RIR: {data.reps_in_reserve ?? "—"}
        </Typography>
      </Stack>
    </Box>
  );
}
