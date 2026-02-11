import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

export function EmptyState() {
  return (
    <Box sx={{ py: 6, textAlign: "center", color: "text.secondary" }}>
      <FitnessCenterIcon sx={{ fontSize: 48, opacity: 0.3, mb: 1 }} />
      <Typography>No exercises recorded yet</Typography>
    </Box>
  );
}
