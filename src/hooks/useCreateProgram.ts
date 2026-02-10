import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../globals";
import { ProgramDetailSchema } from "../schemas/programSchema";

export function useCreateProgram() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      user_id: number;
      exercises: {
        exercise_id: number;
        workout_day: number;
        target_sets: number;
        target_reps: number;
        intensity: number;
        optional: boolean;
      }[];
    }) => {
      const response = await fetch(`${BASE_URL}/programs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Error creating program");
      const json = await response.json();
      return ProgramDetailSchema.parse(json);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["programs"] });
    },
  });
}
