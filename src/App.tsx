import { useQuery } from '@tanstack/react-query';
import { BASE_URL, PROGRAM_ID, USER_ID } from './globals';

function App() {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch(`${BASE_URL}/get-current-week-data`, {
        body: JSON.stringify({ user_id: USER_ID, workout_program_id: PROGRAM_ID }),
      }).then((res) => res.json()),
  });

  if (isPending) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  console.log(data);

  return <></>;
}

export default App;
