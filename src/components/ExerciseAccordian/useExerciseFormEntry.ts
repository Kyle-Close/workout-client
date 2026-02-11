import { useCallback } from "react";
import type { ExerciseForDayView } from "../../schemas/currentWeekSchema";
import type { ExerciseLogFormEntry } from "../../hooks/useExerciseLogForm";

export function useExerciseFormEntry(
  exercise: ExerciseForDayView,
  formData: ExerciseLogFormEntry[],
  setFormData: React.Dispatch<React.SetStateAction<ExerciseLogFormEntry[]>>,
) {
  const entry = formData.find((log) => log.id === exercise.exercise_log_id);

  const createDefaultEntry = useCallback(
    (overrides: Partial<ExerciseLogFormEntry>): ExerciseLogFormEntry => ({
      id: exercise.exercise_log_id,
      workout_day_exercise_id: exercise.workout_day_exercise_id,
      program_week: exercise.program_week,
      weight: exercise.weight,
      sets_completed: exercise.sets_completed ?? 0,
      reps_in_reserve: exercise.reps_in_reserve ?? 0,
      notes: "",
      completed: true,
      ...overrides,
    }),
    [exercise],
  );

  const updateEntry = useCallback(
    (updater: (existing: ExerciseLogFormEntry) => Partial<ExerciseLogFormEntry>) => {
      setFormData((prevFormData) => {
        const existing = prevFormData.find((log) => log.id === exercise.exercise_log_id);

        if (!existing) {
          const newEntry = createDefaultEntry(updater(createDefaultEntry({})));
          return [...prevFormData, newEntry];
        }

        return prevFormData.map((log) =>
          log.id === exercise.exercise_log_id ? { ...log, ...updater(log) } : log,
        );
      });
    },
    [exercise.exercise_log_id, setFormData, createDefaultEntry],
  );

  const handleSetsChange = useCallback(
    (value: number) => {
      if (value < 0) return;
      updateEntry(() => ({ sets_completed: value }));
    },
    [updateEntry],
  );

  const handleRepsInReserveChange = useCallback(
    (value: number) => {
      updateEntry(() => ({ reps_in_reserve: value }));
    },
    [updateEntry],
  );

  const handleNoteChange = useCallback(
    (value: string) => {
      updateEntry(() => ({ notes: value }));
    },
    [updateEntry],
  );

  const setsValue = entry?.sets_completed ?? exercise.sets_completed ?? 0;
  const rirValue = entry?.reps_in_reserve ?? exercise.reps_in_reserve ?? 0;
  const notesValue = entry?.notes ?? "";

  return {
    entry,
    setsValue,
    rirValue,
    notesValue,
    handleSetsChange,
    handleRepsInReserveChange,
    handleNoteChange,
  };
}
