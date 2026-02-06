import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../globals";
import {
  ProgramsListSchema,
  ProgramDetailSchema,
} from "../schemas/programSchema";

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
