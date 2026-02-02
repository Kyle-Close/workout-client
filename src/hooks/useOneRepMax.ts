import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../globals";
import { OneRepMaxSchema } from "../schemas/oneRepMaxesSchema";

export function useOneRepMax(userId: string) {
  const oneRepMaxQuery = useQuery({
    queryKey: ["oneRepMax", userId],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/one-rep-maxes?user_id=${userId}`);
      if (!res.ok) throw new Error("Failed to fetch user one rep maxes");
      const json = await res.json();
      return OneRepMaxSchema.parse(json);
    },
  });

  return {
    oneRepMaxQuery,
  };
}
