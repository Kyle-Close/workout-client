import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../auth";
import z from "zod";

const ActiveWeekSchema = z.number();

export function useGetActiveWeekNumber(workoutProgramId: number) {
  const getActiveWeekQuery = useQuery({
    queryKey: ["activeWeek", workoutProgramId],
    queryFn: async () => {
      const res = await apiFetch(
        `/active-week?workout_program_id=${workoutProgramId}`,
      );
      if (!res.ok) throw new Error("Failed to fetch active week.");
      const json = await res.json();
      return ActiveWeekSchema.parse(json);
    },
  });

  return {
    getActiveWeekQuery,
  };
}
