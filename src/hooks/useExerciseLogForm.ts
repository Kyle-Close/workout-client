import { useState, type FormEvent } from "react";
import { useUpdateExerciseLogs } from "./useUpdateExerciseLogs";

export type ExerciseLogFormEntry = {
  id: number;
  workout_day_exercise_id: number;
  program_week: number;
  weight: number;
  sets_completed: number;
  reps_in_reserve: number;
  notes: string;
  completed: boolean;
};

export function useExerciseLogForm() {
  const [formData, setFormData] = useState<ExerciseLogFormEntry[]>([]);
  const completeDayMutation = useUpdateExerciseLogs();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    completeDayMutation.mutate(formData);
  };

  return {
    formData,
    setFormData,
    handleSubmit,
    completeDayMutation,
  };
}
