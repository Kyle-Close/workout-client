import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../globals";
import {
  ProgramsListSchema,
  ProgramDetailSchema,
} from "../schemas/programSchema";

export function useActiveProgramId(userId: number) {
  const { data } = useGetPrograms(userId);
  return data?.[0]?.id ?? null;
}

export function useGetPrograms(userId: number) {
  return useQuery({
    queryKey: ["programs", userId],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/programs?user_id=${userId}`);
      if (!res.ok) throw new Error("Failed to fetch programs!");
      const json = await res.json();
      return ProgramsListSchema.parse(json);
    },
  });
}

export function useGetProgramDetail(programId: number) {
  return useQuery({
    queryKey: ["program", programId],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/programs/${programId}`);
      if (!res.ok) throw new Error("Failed to fetch program details!");
      const json = await res.json();
      return ProgramDetailSchema.parse(json);
    },
  });
}

export function useUpdateProgramName(programId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      const response = await fetch(`${BASE_URL}/programs/${programId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) throw new Error("Failed to update program name");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["program", programId] });
      queryClient.invalidateQueries({ queryKey: ["programs"] });
    },
  });
}

export function useUpdateProgramExercises(programId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      exercises: {
        id: number;
        target_sets: number;
        target_reps: number;
        intensity: number;
      }[],
    ) => {
      const response = await fetch(
        `${BASE_URL}/programs/${programId}/exercises`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ exercises }),
        },
      );
      if (!response.ok) throw new Error("Failed to update exercises");
      const json = await response.json();
      return ProgramDetailSchema.parse(json);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["program", programId] });
    },
  });
}

export function useDeleteProgram() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { programId: number; userId: number }) => {
      const response = await fetch(
        `${BASE_URL}/programs/${data.programId}?user_id=${data.userId}`,
        { method: "DELETE" },
      );
      if (!response.ok) throw new Error("Failed to delete program");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["programs"] });
    },
  });
}
