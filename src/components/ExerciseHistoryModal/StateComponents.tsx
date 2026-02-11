import { Box, CircularProgress, Typography } from "@mui/material";

export function LoadingState() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 200,
      }}
    >
      <CircularProgress size={32} />
    </Box>
  );
}

export function ErrorState() {
  return (
    <Box sx={{ textAlign: "center", py: 4 }}>
      <Typography color="error">Failed to load history</Typography>
    </Box>
  );
}

export function EmptyState() {
  return (
    <Box sx={{ textAlign: "center", py: 4 }}>
      <Typography color="text.secondary">No history available yet</Typography>
    </Box>
  );
}
