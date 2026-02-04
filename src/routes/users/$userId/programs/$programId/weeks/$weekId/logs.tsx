import { createFileRoute } from "@tanstack/react-router";
import { useGetWeekLogs } from "../../../../../../../hooks/useGetWeekLogs";
import { WeeklyView } from "../../../../../../../components/WeeklyView";
import { useDaySelector } from "../../../../../../../hooks/useDaySelector";
import { Box, CircularProgress, Typography } from "@mui/material";

export const Route = createFileRoute(
  "/users/$userId/programs/$programId/weeks/$weekId/logs",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { userId, programId, weekId } = Route.useParams();
  const { selectedDay, handleDayButtonClick } = useDaySelector();
  const weekLogsQuery = useGetWeekLogs(userId, programId, weekId);

  if (weekLogsQuery.isError) {
    return (
      <Box sx={{ m: 3 }}>
        <Typography color="error">
          There was an error fetching the weekly log data
        </Typography>
      </Box>
    );
  }

  if (weekLogsQuery.isLoading || !weekLogsQuery.data) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress size={32} />
      </Box>
    );
  }

  return (
    <WeeklyView
      weekData={weekLogsQuery.data}
      selectedDay={selectedDay}
      handleDayButtonClick={handleDayButtonClick}
      readOnly={true}
    />
  );
}
