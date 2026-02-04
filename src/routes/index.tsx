import { createFileRoute } from "@tanstack/react-router";
import { WeeklyView } from "../components/WeeklyView";
import { useDaySelector } from "../hooks/useDaySelector";
import { useGetActiveWeekLogs } from "../hooks/useGetActiveWeekLogs";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  const { selectedDay, setSelectedDay, handleDayButtonClick } =
    useDaySelector();
  const query = useGetActiveWeekLogs();

  useEffect(() => {
    if (query.data) setSelectedDay(query.data.currentDayOfWeek);
  }, [query.data?.currentDayOfWeek, setSelectedDay]);

  if (query.isPending) return "Loading...";
  if (query.error) return "An error has occurred: " + query.error.message;
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
