import Typography from "@mui/material/Typography";
import type { ExerciseForDayView } from "../schemas/currentWeekSchema";
import { ExerciseAccordian } from "./ExerciseAccordian";
import { Box, Button, IconButton, Stack } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { type FormEvent } from "react";

interface WeeklyViewProps {
  weekData: ExerciseForDayView[];
  selectedDay: number;
  handleDayButtonClick: (isGoBack: boolean) => void;
  formData: ExerciseLogFormItem[];
  setFormData: React.Dispatch<React.SetStateAction<ExerciseLogFormItem[]>>
  handleSubmit: (e: FormEvent) => void
}

export type ExerciseLogFormItem = {
  id: number;
  user_id: number;
  workout_day_exercise_id: number;
  program_week: number;
  weight: number;
  sets_completed: number;
  reps_in_reserve: number;
  notes: string;
  completed: boolean;
};

export function WeeklyView({
  weekData,
  selectedDay,
  handleDayButtonClick,
  formData,
  setFormData,
  handleSubmit
}: WeeklyViewProps) {
  const weekNumber = weekData[0].program_week;

  const minDay = 1;
  const maxDay = weekData.reduce(
    (max, data) => Math.max(max, data.workout_day),
    -Infinity,
  );

  const disableBackBtn = minDay === selectedDay;
  const disableForwardBtn = maxDay === selectedDay;

  return (
    <>
      <Box className="flex flex-row justify-between items-end pb-4">
        <Typography className="text-amber-700" variant="h4">
          Week {weekNumber}
        </Typography>
        <Stack direction="row" spacing={2}>
          <IconButton
            disabled={disableBackBtn}
            onClick={() => handleDayButtonClick(true)}
            size="small"
          >
            <ArrowBackIosIcon />
          </IconButton>

          <Typography variant="h6">Day {selectedDay}</Typography>

          <IconButton
            disabled={disableForwardBtn}
            onClick={() => handleDayButtonClick(false)}
            size="small"
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Stack>
      </Box>
      <Stack component='form' onSubmit={handleSubmit}>
        {weekData.map((data, key) => {
          if (selectedDay === data.workout_day) {
            return <ExerciseAccordian exercise={data} key={key} formData={formData} setFormData={setFormData} />;
          }
        })}
        <Button sx={{ mt: 2 }} variant="contained" type="submit">Complete Workout</Button>
      </Stack>
    </>
  );
}
