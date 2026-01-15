import type { ExerciseForDayView } from "../schemas/currentWeekSchema";

interface WeeklyViewProps {
  currentDay: number;
  weekData: ExerciseForDayView[];
}

export function WeeklyView({ currentDay, weekData }: WeeklyViewProps) {
  const weekNumber = weekData[0].program_week;

  return (
    <div>
      <h3>Week {weekNumber}</h3>
      <h6>Day {currentDay}</h6>
    </div>
  );
}
