import { Box, Button, Typography } from "@mui/material";
import ShowChartIcon from "@mui/icons-material/ShowChart";

interface TargetStatsCardProps {
  targetSets: number;
  targetReps: number;
  onHistoryClick: () => void;
}

export function TargetStatsCard({ targetSets, targetReps, onHistoryClick }: TargetStatsCardProps) {
  return (
    <Box sx={{ display: "flex", gap: 1.5, alignItems: "stretch", mb: 1.5 }}>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          gap: 1,
          p: 1.5,
          borderRadius: "8px",
          bgcolor: "rgba(255,255,255,0.04)",
        }}
      >
        <Box sx={{ flex: 1, textAlign: "center", py: 0.5 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
          >
            Target Sets
          </Typography>
          <Typography fontWeight={600} fontSize="1.1rem">
            {targetSets}
          </Typography>
        </Box>
        <Box
          sx={{ width: "1px", bgcolor: "rgba(255,255,255,0.1)", alignSelf: "stretch" }}
        />
        <Box sx={{ flex: 1, textAlign: "center", py: 0.5 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
          >
            Target Reps
          </Typography>
          <Typography fontWeight={600} fontSize="1.1rem">
            {targetReps}
          </Typography>
        </Box>
      </Box>
      <Button
        variant="outlined"
        onClick={onHistoryClick}
        sx={{
          minWidth: 0,
          px: 1.5,
          borderRadius: "8px",
          borderColor: "rgba(255,255,255,0.12)",
          color: "text.secondary",
          display: "flex",
          flexDirection: "column",
          gap: 0.25,
          "&:hover": {
            borderColor: "primary.main",
            color: "primary.main",
            bgcolor: "rgba(144, 202, 249, 0.08)",
          },
        }}
      >
        <ShowChartIcon sx={{ fontSize: 20 }} />
        <Typography variant="caption" sx={{ fontSize: "0.6rem", textTransform: "none" }}>
          History
        </Typography>
      </Button>
    </Box>
  );
}
