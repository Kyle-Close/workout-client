import Typography from "@mui/material/Typography";
import type { ExerciseForDayView } from "../schemas/currentWeekSchema";
import { ExerciseAccordian } from "./ExerciseAccordian";
import { Alert, Box, Button, Divider, IconButton, Stack } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { type FormEvent } from "react";
import type { UseMutationResult } from "@tanstack/react-query";

interface WeeklyViewProps {
  weekData: ExerciseForDayView[];
  selectedDay: number;
  handleDayButtonClick: (isGoBack: boolean) => void;
  formData: ExerciseLogFormItem[];
  setFormData: React.Dispatch<React.SetStateAction<ExerciseLogFormItem[]>>;
  handleSubmit: (e: FormEvent) => void;
  completeDayMutation: UseMutationResult<
    any,
    Error,
    ExerciseLogFormItem[],
    unknown
  >;
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
  handleSubmit,
  completeDayMutation,
}: WeeklyViewProps) {
  const weekNumber = weekData[0].program_week;

  const minDay = 1;
  const maxDay = weekData.reduce(
    (max, data) => Math.max(max, data.workout_day),
    -Infinity,
  );

  const disableBackBtn = minDay === selectedDay;
  const disableForwardBtn = maxDay === selectedDay;

  if (completeDayMutation.isPending) {
    return <p>Submitting...</p>;
  }

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
      <Stack component="form" onSubmit={handleSubmit}>
        {weekData.map((data, key) => {
          if (selectedDay === data.workout_day && !data.optional) {
            return (
              <ExerciseAccordian
                titleFontWeight={"500"}
                exercise={data}
                key={key}
                formData={formData}
                setFormData={setFormData}
              />
            );
          }
        })}
        <Divider
          sx={{ m: 2, "& .MuiDivider-wrapper": { fontStyle: "italic" } }}
        >
          Optional
        </Divider>
        {weekData.map((data, key) => {
          if (selectedDay === data.workout_day && data.optional) {
            return (
              <ExerciseAccordian
                titleFontWeight="lighter"
                exercise={data}
                key={key}
                formData={formData}
                setFormData={setFormData}
              />
            );
          }
        })}
        <Button
          disabled={formData.length === 0}
          sx={{ mt: 2 }}
          variant="contained"
          type="submit"
        >
          Log Exercises
        </Button>
        {completeDayMutation.isSuccess && (
          <Alert severity="success">
            Successfully updated exercise log(s).
          </Alert>
        )}
        {completeDayMutation.isError && (
          <Alert severity="error">
            There was an error updating the logs. At least 1 field must be
            changed.
          </Alert>
        )}
      </Stack>
    </Box>
  );
}
