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
  readOnly: boolean;
}

export function WeeklyView({
  weekData,
  selectedDay,
  handleDayButtonClick,
  readOnly,
}: WeeklyViewProps) {
  if (!weekData || weekData.length === 0) {
    return (
      <Box sx={{ px: { xs: 2, sm: 3 }, py: 3 }}>
        <Typography color="text.secondary" textAlign="center">
          No workout data available. Please set up your one-rep maxes to generate your weekly schedule.
        </Typography>
      </Box>
    );
  }

  const weekNumber = weekData[0].program_week;

  const minDay = 1;
  const maxDay = weekData.reduce(
    (max, data) => Math.max(max, data.workout_day),
    -Infinity,
  );

  const disableBackBtn = minDay === selectedDay;
  const disableForwardBtn = maxDay === selectedDay;

  return (
    <Box sx={{ px: { xs: 2, sm: 3 }, py: 3 }}>
      {/* Header */}
      <Stack
        direction="row"
        alignItems="baseline"
        justifyContent="space-between"
        sx={{ mb: 2.5, ml: 1.5 }}
      >
        <Typography
          fontWeight={700}
          fontSize={{ xs: "1.5rem", sm: "1.75rem" }}
          color="text.primary"
          sx={{ lineHeight: 1 }}
        >
          Week {weekNumber}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={0.5}>
          <IconButton
            disabled={disableBackBtn}
            onClick={() => handleDayButtonClick(true)}
            sx={{
              width: 36,
              height: 36,
              "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
            }}
          >
            <ArrowBackIosIcon sx={{ fontSize: 14, ml: 0.5 }} />
          </IconButton>

          <Typography
            fontWeight={600}
            fontSize="0.95rem"
            color="text.secondary"
            sx={{ minWidth: 48, textAlign: "center" }}
          >
            Day {selectedDay}
          </Typography>

          <IconButton
            disabled={disableForwardBtn}
            onClick={() => handleDayButtonClick(false)}
            sx={{
              width: 36,
              height: 36,
              "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
            }}
          >
            <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Stack>
      </Stack>

      <DayView
        exerciseLogs={weekData.filter((log) => log.workout_day === selectedDay)}
        readOnly={readOnly}
      />
    </Box>
  );
}
