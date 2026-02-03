import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useGetActiveWeek } from "../../hooks/useGetActiveWeek";
import { Box, Button, Grid, Typography } from "@mui/material";

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
