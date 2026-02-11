import { useQuery } from "@tanstack/react-query";
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
