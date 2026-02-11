import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../auth";
import { UserWeightListSchema } from "../schemas/userWeightSchema";

export function useGetUserWeight() {
  return useQuery({
    queryKey: ["userWeight"],
    queryFn: async () => {
      const res = await apiFetch("/user-weight");
      if (!res.ok) throw new Error("Failed to fetch weight entries!");
      const json = await res.json();
      return UserWeightListSchema.parse(json);
    },
  });
}

export function useCreateUserWeight() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { weight: number; date: string }) => {
      const response = await apiFetch("/user-weight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to log weight entry");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userWeight"] });
    },
  });
}

export function useDeleteUserWeight() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await apiFetch(`/user-weight/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete weight entry");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userWeight"] });
    },
  });
}
