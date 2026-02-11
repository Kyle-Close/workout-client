import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../auth";
import { ExerciseHistorySchema } from "../schemas/exerciseHistorySchema";

export function useExerciseHistory(exerciseId: number | null) {
  return useQuery({
    queryKey: ["exerciseHistory", exerciseId],
    queryFn: async () => {
      const res = await apiFetch(
        `/exercises/history?exercise_id=${exerciseId}`,
      );
      if (!res.ok) throw new Error("Failed to fetch exercise history!");
      const json = await res.json();
      return ExerciseHistorySchema.parse(json);
    },
    enabled: exerciseId !== null,
  });
}
