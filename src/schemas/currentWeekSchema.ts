import * as z from "zod";

const ExerciseObjectForDayView = z.object({
  exercise_log_id: z.number(),
  exercise_name: z.string(),
  program_week: z.number(),
  workout_day: z.number(),
  weight: z.number(),
  target_sets: z.number(),
  target_reps: z.number(),
  sets_completed: z.number().nullable(),
  reps_in_reserve: z.number().nullable(),
});

export const CurrentWeekSchema = z.array(ExerciseObjectForDayView);
export type CurrentWeek = z.infer<typeof CurrentWeekSchema>;
