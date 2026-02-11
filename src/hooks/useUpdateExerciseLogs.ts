import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../auth";
import type { ExerciseLogFormEntry } from "./useExerciseLogForm";

export function useUpdateExerciseLogs() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updateLogsData: ExerciseLogFormEntry[]) => {
      const response = await apiFetch("/update-logs", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateLogsData),
      });
      if (!response.ok) throw new Error("Error sending form data");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentWeekData"] });
    },
  });
}
