import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../globals";
import { WeekLogsSchema } from "../schemas/currentWeekSchema";

export function useGetWeekLogs(
  userId: number,
  programId: number,
  weekNum: number,
) {
  return useQuery({
    queryKey: ["weekLogs", weekNum],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/week-logs?user_id=${userId}&workout_program_id=${programId}&week_num=${weekNum}`,
      );
      if (!res.ok) throw new Error("Failed to fetch week data!");
      const json = await res.json();
      return WeekLogsSchema.parse(json);
    },
  });
}
