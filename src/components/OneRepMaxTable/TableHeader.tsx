import { Box, Typography } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

export function TableHeader() {
  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3 },
        py: { xs: 2, sm: 2.5 },
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        borderBottom: "1px solid",
        borderColor: "grey.800",
      }}
    >
      <FitnessCenterIcon sx={{ color: "grey.300", fontSize: { xs: 24, sm: 28 } }} />
      <Typography
        variant="h6"
        sx={{
          color: "white",
          fontWeight: 600,
          letterSpacing: 0.5,
          fontSize: { xs: "1rem", sm: "1.25rem" },
        }}
      >
        One Rep Max Progress
      </Typography>
    </Box>
  );
}
