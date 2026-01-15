import { useCurrentWeekData } from "./hooks/useCurrentWeekData";

function App() {
  const { isPending, error, data } = useCurrentWeekData();

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  if (!data) return null;

  return (
    <ul>
      {data.map((log, key) => (
        <li key={key}>{log.exercise_name}</li>
      ))}
    </ul>
  );
}

export default App;
