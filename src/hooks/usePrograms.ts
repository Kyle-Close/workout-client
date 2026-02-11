import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../auth";
import {
  ProgramsListSchema,
  ProgramDetailSchema,
} from "../schemas/programSchema";

export function useActiveProgramId() {
  const { data } = useGetPrograms();
  return data?.[0]?.id ?? null;
}

export function useGetPrograms() {
  return useQuery({
    queryKey: ["programs"],
    queryFn: async () => {
      const res = await apiFetch("/programs");
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
      const res = await apiFetch(`/programs/${programId}`);
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
      const response = await apiFetch(`/programs/${programId}`, {
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
      const response = await apiFetch(
        `/programs/${programId}/exercises`,
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
    mutationFn: async (programId: number) => {
      const response = await apiFetch(`/programs/${programId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete program");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["programs"] });
    },
  });
}
