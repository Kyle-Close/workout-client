import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../auth";
import { OneRepMaxSchema } from "../schemas/oneRepMaxesSchema";

export function useOneRepMax() {
  const oneRepMaxQuery = useQuery({
    queryKey: ["oneRepMax"],
    queryFn: async () => {
      const res = await apiFetch("/one-rep-maxes");
      if (!res.ok) throw new Error("Failed to fetch user one rep maxes");
      const json = await res.json();
      return OneRepMaxSchema.parse(json);
    },
  });

  return {
    oneRepMaxQuery,
  };
}

export function useSetOneRepMaxes() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (maxes: { exercise_id: number; one_rep_max: number }[]) => {
      const response = await apiFetch("/one-rep-maxes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ maxes }),
      });
      if (!response.ok) throw new Error("Failed to set one rep maxes");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["oneRepMax"] });
      queryClient.invalidateQueries({ queryKey: ["activeWeekLogs"] });
    },
  });
}
