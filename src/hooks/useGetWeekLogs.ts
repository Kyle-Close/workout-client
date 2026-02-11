import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../auth";
import { WeekLogsSchema } from "../schemas/currentWeekSchema";

export function useGetWeekLogs(programId: number, weekNum: number) {
  return useQuery({
    queryKey: ["weekLogs", weekNum],
    queryFn: async () => {
      const res = await apiFetch(
        `/week-logs?workout_program_id=${programId}&week_num=${weekNum}`,
      );
      if (!res.ok) throw new Error("Failed to fetch week data!");
      const json = await res.json();
      return WeekLogsSchema.parse(json);
    },
  });
}
