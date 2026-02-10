import { useQuery } from "@tanstack/react-query";
import { BASE_URL, USER_ID } from "../globals";
import { CurrentWeekSchema } from "../schemas/currentWeekSchema";

export function useGetActiveWeekLogs(programId: number | null) {
  return useQuery({
    queryKey: ["currentWeekData", programId],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/get-current-week-data?user_id=${USER_ID}&workout_program_id=${programId}`,
      );
      if (!res.ok) throw new Error("Failed to fetch current week data!");
      const json = await res.json();
      return CurrentWeekSchema.parse(json);
    },
    enabled: programId !== null,
  });
}
