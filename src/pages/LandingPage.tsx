import { WeeklyView } from "../components/WeeklyView";
import { useCurrentWeekData } from "../hooks/useCurrentWeekData";

export default function LandingPage() {
  const {
    selectedDay,
    handleDayButtonClick,
    formData,
    setFormData,
    handleSubmit,
    currentWeekDataQuery,
    completeDayMutation,
  } = useCurrentWeekData();

  if (currentWeekDataQuery.isPending) return "Loading...";
  if (currentWeekDataQuery.error)
    return "An error has occurred: " + currentWeekDataQuery.error.message;
  if (!currentWeekDataQuery.data) return null;

  return (
    <WeeklyView
      weekData={currentWeekDataQuery.data.weekData}
      selectedDay={selectedDay}
      handleDayButtonClick={handleDayButtonClick}
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      completeDayMutation={completeDayMutation}
    />
  );
}
