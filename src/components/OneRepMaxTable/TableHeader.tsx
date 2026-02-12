import { Box, Tooltip, Typography } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

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
          flex: 1,
        }}
      >
        One Rep Max Progress
      </Typography>
      <Tooltip
        title="Your one rep max (1RM) is the most weight you can lift for a single rep. The program uses these values to calculate your working weights — each set is programmed as a percentage of your 1RM for that exercise."
        arrow
        placement="bottom-end"
        enterTouchDelay={0}
      >
        <InfoOutlinedIcon sx={{ color: "grey.500", fontSize: 20, cursor: "pointer" }} />
      </Tooltip>
    </Box>
  );
}
