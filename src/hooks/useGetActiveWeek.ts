import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../globals";
import z from "zod";

const ActiveWeekSchema = z.number();

export function useGetActiveWeek(userId: number, workoutProgramId: number) {
  const getActiveWeekQuery = useQuery({
    queryKey: ["activeWeek", userId, workoutProgramId],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/active-week?user_id=${userId}&workout_program_id=${workoutProgramId}`,
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
