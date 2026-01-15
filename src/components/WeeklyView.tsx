import Typography from "@mui/material/Typography";
import type { ExerciseForDayView } from "../schemas/currentWeekSchema";
import Box from "@mui/material/Typography";

interface WeeklyViewProps {
  currentDay: number;
  weekData: ExerciseForDayView[];
}

export function WeeklyView({ currentDay, weekData }: WeeklyViewProps) {
  const weekNumber = weekData[0].program_week;

  return (
    <Box className="flex flex-row justify-between items-end">
      <Typography className="text-amber-700" variant="h4">
        Week {weekNumber}
      </Typography>
      <Typography variant="h6">Day {currentDay}</Typography>
    </Box>
  );
}
