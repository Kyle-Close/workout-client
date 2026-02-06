import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../globals";
import { ExerciseHistorySchema } from "../schemas/exerciseHistorySchema";

export function useExerciseHistory(userId: number, exerciseId: number | null) {
  return useQuery({
    queryKey: ["exerciseHistory", userId, exerciseId],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/exercises/history?user_id=${userId}&exercise_id=${exerciseId}`
      );
      if (!res.ok) throw new Error("Failed to fetch exercise history!");
      const json = await res.json();
      return ExerciseHistorySchema.parse(json);
    },
    enabled: exerciseId !== null,
  });
}
