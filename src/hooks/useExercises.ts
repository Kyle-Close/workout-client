import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../globals";
import { ExerciseListSchema, ExerciseSchema } from "../schemas/exerciseSchema";

export function useGetExercises() {
  return useQuery({
    queryKey: ["exercises"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/exercises`);
      if (!res.ok) throw new Error("Failed to fetch exercises!");
      const json = await res.json();
      return ExerciseListSchema.parse(json);
    },
  });
}

export function useCreateExercise() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      equipment_type: string;
      weight_increment: number;
    }) => {
      const response = await fetch(`${BASE_URL}/exercises`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status === 409)
        throw new Error("Exercise already exists");
      if (!response.ok) throw new Error("Error creating exercise");
      const json = await response.json();
      return ExerciseSchema.parse(json);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
    },
  });
}
