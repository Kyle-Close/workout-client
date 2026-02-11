import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../auth";
import { CurrentWeekSchema } from "../schemas/currentWeekSchema";

export function useGetActiveWeekLogs(programId: number | null) {
  return useQuery({
    queryKey: ["currentWeekData", programId],
    queryFn: async () => {
      const res = await apiFetch(
        `/get-current-week-data?workout_program_id=${programId}`,
      );
      if (!res.ok) throw new Error("Failed to fetch current week data!");
      const json = await res.json();
      return CurrentWeekSchema.parse(json);
    },
    enabled: programId !== null,
  });
}
