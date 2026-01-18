import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../globals";
import type { ExerciseLogFormItem } from "../components/WeeklyView";

export function useCompleteDay() {
  return useMutation({
    mutationFn: async (completeDayData: ExerciseLogFormItem[]) => {
      const response = await fetch(`${BASE_URL}/complete-day`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(completeDayData),
      });
      if (!response.ok) throw new Error("Error sending form data");
      return response.json();
    },
  });
}
