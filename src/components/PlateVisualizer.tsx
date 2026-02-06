import { Box, Stack, Typography } from "@mui/material";
import type { Plates } from "../schemas/currentWeekSchema";

const PLATE_HEIGHTS: Record<string, number> = {
  "45": 56,
  "35": 48,
  "25": 42,
  "10": 34,
  "5": 28,
  "2.5": 20,
};

const PLATE_WIDTHS: Record<string, number> = {
  "45": 12,
  "35": 10,
  "25": 9,
  "10": 8,
  "5": 7,
  "2.5": 6,
};

const PLATE_ORDER = ["45", "35", "25", "10", "5", "2.5"];

const ACTIVE_COLOR = "#90caf9";
const INACTIVE_COLOR = "rgba(255,255,255,0.08)";

function parsePlateKey(key: string): string {
  const withoutPrefix = key.replace("plates_", "");
  return withoutPrefix.replace("_", ".");
}

interface PlateVisualizerProps {
  plates: Plates;
}

export function PlateVisualizer({ plates }: PlateVisualizerProps) {
  const plateMap = Object.entries(plates).reduce(
    (acc, [key, count]) => {
      acc[parsePlateKey(key)] = count;
      return acc;
    },
    {} as Record<string, number>,
  );

  const hasAnyPlates = Object.values(plateMap).some((count) => count > 0);

  if (!hasAnyPlates) {
    return (
      <Box sx={{ textAlign: "center", py: 2 }}>
        <Typography variant="caption" color="text.secondary">
          No plates needed
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          textTransform: "uppercase",
          letterSpacing: 0.5,
          display: "block",
          textAlign: "center",
          mb: 1,
        }}
      >
        Plates per side
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={0.5}
        sx={{ py: 1 }}
      >
        {/* Bar end */}
        <Box
          sx={{
            width: 8,
            height: 20,
            bgcolor: "grey.600",
            borderRadius: "2px 0 0 2px",
          }}
        />

        {/* Bar shaft */}
        <Box
          sx={{
            width: 12,
            height: 10,
            bgcolor: "grey.500",
          }}
        />

        {/* Plates - all plates shown, active or inactive */}
        {PLATE_ORDER.map((weight) => {
          const count = plateMap[weight] || 0;
          const isActive = count > 0;

          return (
            <Box
              key={weight}
              sx={{
                width: PLATE_WIDTHS[weight] || 10,
                height: PLATE_HEIGHTS[weight] || 36,
                bgcolor: isActive ? ACTIVE_COLOR : INACTIVE_COLOR,
                borderRadius: `${(PLATE_WIDTHS[weight] || 10) / 2}px`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                border: isActive ? "none" : "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {isActive && count > 1 && (PLATE_WIDTHS[weight] || 10) >= 10 && (
                <Typography
                  sx={{
                    fontSize: "0.55rem",
                    fontWeight: 700,
                    color: "rgba(0,0,0,0.7)",
                    lineHeight: 1,
                  }}
                >
                  {count}
                </Typography>
              )}
            </Box>
          );
        })}
      </Stack>

      {/* Legend */}
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        gap={0.75}
        sx={{ mt: 1.5 }}
      >
        {PLATE_ORDER.map((weight) => {
          const count = plateMap[weight] || 0;
          const isActive = count > 0;

          return (
            <Box
              key={weight}
              sx={{
                px: 0.75,
                py: 0.25,
                borderRadius: "4px",
                bgcolor: isActive
                  ? "rgba(144, 202, 249, 0.15)"
                  : "rgba(255,255,255,0.03)",
                border: 1,
                borderColor: isActive
                  ? "rgba(144, 202, 249, 0.3)"
                  : "rgba(255,255,255,0.08)",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: isActive ? 600 : 400,
                  fontSize: "0.7rem",
                  color: isActive ? ACTIVE_COLOR : "text.disabled",
                }}
              >
                {weight}
                {isActive && count > 1 && ` x${count}`}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
