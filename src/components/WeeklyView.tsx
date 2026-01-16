import Typography from "@mui/material/Typography";
import type { ExerciseForDayView } from "../schemas/currentWeekSchema";
import { ExerciseAccordian } from "./ExerciseAccordian";
import { Box, Button, IconButton, Stack } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface WeeklyViewProps {
  weekData: ExerciseForDayView[];
  selectedDay: number;
  handleDayButtonClick: (isGoBack: boolean) => void;
}

export function WeeklyView({
  weekData,
  selectedDay,
  handleDayButtonClick,
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
      <Stack component='form'>
        {weekData.map((data, key) => {
          if (selectedDay === data.workout_day) {
            return <ExerciseAccordian exercise={data} key={key} />;
          }
        })}
        <Button sx={{ mt: 2 }} variant="contained" type="submit">Complete Workout</Button>
      </Stack>
    </>
  );
}
