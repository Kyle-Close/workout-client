import { WeeklyView } from "./components/WeeklyView";
import { useCurrentWeekData } from "./hooks/useCurrentWeekData";

function App() {
  const { isPending, error, data } = useCurrentWeekData();

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  if (!data) return null;

  return (
    <WeeklyView currentDay={data.currentDayOfWeek} weekData={data.weekData} />
  );
}

export default App;
