import { useQuery } from "@tanstack/react-query";
import { BASE_URL, PROGRAM_ID, USER_ID } from "../globals";
import {
  CurrentWeekSchema,
  type CurrentWeek,
} from "../schemas/currentWeekSchema";

export function useCurrentWeekData() {
  const { isPending, error, data } = useQuery({
    queryKey: ["currentWeekData"],
    queryFn: () => fetchCurrentWeekData(),
  });

  return { isPending, error, data };
}

async function fetchCurrentWeekData(): Promise<CurrentWeek> {
  const res = await fetch(
    `${BASE_URL}/get-current-week-data?user_id=${USER_ID}&workout_program_id=${PROGRAM_ID}`,
  );
  if (!res.ok) throw new Error("Failed to fetch current week data!");
  const json = await res.json();
  return CurrentWeekSchema.parse(json);
}
