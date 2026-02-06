import * as z from "zod";

export const PlatesSchema = z.object({
  plates_45: z.number(),
  plates_35: z.number(),
  plates_25: z.number(),
  plates_10: z.number(),
  plates_5: z.number(),
  plates_2_5: z.number(),
});

export const ExerciseObjectForDayView = z.object({
  exercise_log_id: z.number(),
  workout_day_exercise_id: z.number(),
  exercise_name: z.string(),
  program_week: z.number(),
  workout_day: z.number(),
  weight: z.number(),
  target_sets: z.number(),
  target_reps: z.number(),
  sets_completed: z.number().nullable(),
  reps_in_reserve: z.number().nullable(),
  optional: z.boolean(),
  completed: z.boolean(),
  plates: PlatesSchema.optional(),
});

export type Plates = z.infer<typeof PlatesSchema>;

export const CurrentWeekSchema = z.object({
  currentDayOfWeek: z.number(),
  weekData: z.array(ExerciseObjectForDayView),
});

export const WeekLogsSchema = z.array(ExerciseObjectForDayView);

export type CurrentWeek = z.infer<typeof CurrentWeekSchema>;
export type ExerciseForDayView = z.infer<typeof ExerciseObjectForDayView>;
