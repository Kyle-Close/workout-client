import { createFileRoute } from "@tanstack/react-router";
import { useGetActiveWeek } from "../../hooks/useGetActiveWeek";
import { Box, Button, Grid, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const Route = createFileRoute("/history/$userId/$workoutProgramId")({
  component: ActiveWeekPage,
});

function ActiveWeekPage() {
  const { userId, workoutProgramId } = Route.useParams();
  const { getActiveWeekQuery } = useGetActiveWeek(userId, workoutProgramId);

  if (getActiveWeekQuery.isError) {
    return (
      <Box m={3}>
        <Typography color="error">
          There was an error fetching week data
        </Typography>
      </Box>
    );
  }

  if (getActiveWeekQuery.isLoading) {
    return (
      <Box m={3}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  const gridItems = () => {
    if (!getActiveWeekQuery.data) return [];
    const result = [];
    for (let i = 0; i < getActiveWeekQuery.data; i++) {
      const isCompleted = i + 1 < getActiveWeekQuery.data;
      const isCurrent = i + 1 === getActiveWeekQuery.data;
      result.push(
        <WeekSquare
          key={i}
          weekNumber={i + 1}
          isCompleted={isCompleted}
          isCurrent={isCurrent}
        />,
      );
    }
    return result;
  };

  return (
    <Box m={3} display="flex" flexDirection="column" gap={2}>
      <Typography variant="h4" fontWeight={600} color="primary">
        Workout History
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Track your progress through the program
      </Typography>
      <Grid container spacing={2} mt={1}>
        {gridItems()}
      </Grid>
    </Box>
  );
}

interface WeekSquareProps {
  weekNumber: number;
  isCompleted: boolean;
  isCurrent: boolean;
}

function WeekSquare({ weekNumber, isCompleted, isCurrent }: WeekSquareProps) {
  return (
    <Grid size={{ xs: 6, sm: 4, md: 3 }}>
      <Button
        fullWidth
        sx={{
          bgcolor: isCompleted ? "#2e7d32" : isCurrent ? "#1976d2" : "#424242",
          minHeight: "100px",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: 2,
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s ease",
          border: isCurrent ? "2px solid #42a5f5" : "none",
          boxShadow: isCurrent
            ? "0 4px 20px rgba(25, 118, 210, 0.4)"
            : isCompleted
              ? "0 2px 8px rgba(46, 125, 50, 0.3)"
              : "0 2px 8px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: isCurrent
              ? "0 8px 24px rgba(25, 118, 210, 0.5)"
              : isCompleted
                ? "0 6px 16px rgba(46, 125, 50, 0.4)"
                : "0 4px 12px rgba(0, 0, 0, 0.3)",
            bgcolor: isCompleted
              ? "#388e3c"
              : isCurrent
                ? "#1e88e5"
                : "#4f4f4f",
          },
          "&::before": isCompleted
            ? {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
              }
            : {},
        }}
      >
        <Typography
          variant="h3"
          fontWeight={700}
          color="white"
          sx={{ opacity: 0.9 }}
        >
          {weekNumber}
        </Typography>
        <Typography
          variant="caption"
          color="white"
          sx={{ opacity: 0.8, textTransform: "none" }}
        >
          {isCurrent ? "Current Week" : isCompleted ? "Completed" : "Week"}
        </Typography>
        {isCompleted && (
          <CheckCircleIcon
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "white",
              fontSize: 20,
              opacity: 0.9,
            }}
          />
        )}
      </Button>
    </Grid>
  );
}
