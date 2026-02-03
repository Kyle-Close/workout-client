import { createFileRoute } from "@tanstack/react-router";
import { useGetWeekLogs } from "../../../../../../../hooks/useGetWeekLogs";
import { WeeklyView } from "../../../../../../../components/WeeklyView";
import { useDaySelector } from "../../../../../../../hooks/useDaySelector";

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
    return <div>There was an error fetching the weekly log data</div>;
  }

  if (weekLogsQuery.isLoading || !weekLogsQuery.data) {
    return <div>Loading...</div>;
  }

  return (
    <WeeklyView
      weekData={weekLogsQuery.data}
      selectedDay={selectedDay}
      handleDayButtonClick={handleDayButtonClick}
    />
  );
}
