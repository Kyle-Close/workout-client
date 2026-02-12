import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../auth";
import { ProgramDetailSchema } from "../schemas/programSchema";

export function useCreateProgram() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      exercises: {
        exercise_id: number;
        workout_day: number;
        target_sets: number;
        target_reps: number;
        intensity: number;
        optional: boolean;
      }[];
    }) => {
      const response = await apiFetch("/programs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.detail || "Error creating program");
      }
      const json = await response.json();
      return ProgramDetailSchema.parse(json);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["programs"] });
    },
  });
}
