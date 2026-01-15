import { WeeklyView } from "./components/WeeklyView";
import { useCurrentWeekData } from "./hooks/useCurrentWeekData";

function App() {
  const { isPending, error, data, selectedDay, handleDayButtonClick } =
    useCurrentWeekData();

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  if (!data) return null;

  return (
    <WeeklyView
      weekData={data.weekData}
      selectedDay={selectedDay}
      handleDayButtonClick={handleDayButtonClick}
    />
  );
}

export default App;
