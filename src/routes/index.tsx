import { createFileRoute } from "@tanstack/react-router";
import { WeeklyView } from "../components/WeeklyView";
import { useDaySelector } from "../hooks/useDaySelector";
import { useGetActiveWeekLogs } from "../hooks/useGetActiveWeekLogs";
import { useActiveProgramId } from "../hooks/usePrograms";
import { useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { USER_ID } from "../globals";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  const { selectedDay, setSelectedDay, handleDayButtonClick } =
    useDaySelector();
  const activeProgramId = useActiveProgramId(USER_ID);
  const query = useGetActiveWeekLogs(activeProgramId);

  useEffect(() => {
    if (query.data) setSelectedDay(query.data.currentDayOfWeek);
  }, [query.data?.currentDayOfWeek, setSelectedDay]);

  if (activeProgramId === null || query.isPending)
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

  if (query.error)
    return (
      <Box sx={{ m: 3 }}>
        <Typography color="error">
          An error has occurred: {query.error.message}
        </Typography>
      </Box>
    );

  if (!query.data) return null;

  return (
    <WeeklyView
      weekData={query.data.weekData}
      selectedDay={selectedDay}
      handleDayButtonClick={handleDayButtonClick}
      readOnly={false}
    />
  );
}
