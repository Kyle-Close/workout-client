import Typography from "@mui/material/Typography";
import type { ExerciseForDayView } from "../schemas/currentWeekSchema";
import { Box, IconButton, Stack } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { DayView } from "./DayView";

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

  const bgCss =
    "linear-gradient(270deg,rgba(144, 202, 249, 1) 0%, rgba(84, 136, 179, 1) 50%, rgba(36, 60, 77, 1) 100%);";

  const bgCss2 =
    "linear-gradient(270deg,rgba(206, 147, 216, 1) 0%, rgba(145, 90, 153, 1) 50%, rgba(97, 55, 99, 1) 100%);";

  return (
    <Box padding={3}>
      <Box className="flex flex-row justify-between items-end pb-4">
        <Typography
          color="primary"
          variant="h4"
          sx={{
            background: bgCss,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
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

          <Typography
            color="secondary"
            variant="h6"
            sx={{
              background: bgCss2,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            Day {selectedDay}
          </Typography>

          <IconButton
            disabled={disableForwardBtn}
            onClick={() => handleDayButtonClick(false)}
            size="small"
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Stack>
      </Box>
      <DayView
        exerciseLogs={weekData.filter((log) => log.workout_day === selectedDay)}
      />
    </Box>
  );
}
