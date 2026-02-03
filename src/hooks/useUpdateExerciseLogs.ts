import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../globals";
import type { ExerciseLogFormEntry } from "./useExerciseLogForm";

export function useUpdateExerciseLogs() {
  return useMutation({
    mutationFn: async (updateLogsData: ExerciseLogFormEntry[]) => {
      const response = await fetch(`${BASE_URL}/update-logs`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateLogsData),
      });
      if (!response.ok) throw new Error("Error sending form data");
      return response.json();
    },
  });
}
