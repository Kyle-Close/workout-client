import type { ExerciseForDayView } from "../schemas/currentWeekSchema";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Stack } from "@mui/material";
import NumberSpinner from "./NumberSpinner";
import type { ExerciseLogFormItem } from "./WeeklyView";
import { USER_ID } from "../globals";

interface ExerciseAccordianProps {
  exercise: ExerciseForDayView;
  formData: ExerciseLogFormItem[];
  setFormData: React.Dispatch<React.SetStateAction<ExerciseLogFormItem[]>>;
}

export function ExerciseAccordian({
  exercise,
  formData,
  setFormData,
}: ExerciseAccordianProps) {
  const handleSpinnerChange = (
    value: number | null,
    isUpdatingSets: boolean,
  ) => {
    if (!value) return;
    setFormData((prevFormData) => {
      const entry = prevFormData.find(
        (log) => log.id === exercise.exercise_log_id,
      );

      if (!entry) {
        const item: ExerciseLogFormItem = {
          id: exercise.exercise_log_id,
          user_id: USER_ID,
          workout_day_exercise_id: 0,
          program_week: exercise.program_week,
          weight: exercise.weight,
          sets_completed: isUpdatingSets
            ? value
            : (exercise.sets_completed ?? 0),
          reps_in_reserve: !isUpdatingSets
            ? value
            : (exercise.reps_in_reserve ?? 0),
          notes: "",
          completed: true,
        };
        return [...prevFormData, item];
      } else {
        return prevFormData.map((log) =>
          log.id === exercise.exercise_log_id
            ? {
                ...log,
                sets_completed: isUpdatingSets ? value : log.sets_completed,
                reps_in_reserve: !isUpdatingSets ? value : log.reps_in_reserve,
              }
            : log,
        );
      }
    });
  };

  const entry = formData.find((log) => log.id === exercise.exercise_log_id);

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" component="span">
          {exercise.exercise_name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2} ml={2} mr={2}>
          <Stack direction="row" justifyContent="space-around">
            <Stack direction="row" spacing={1}>
              <Typography fontWeight="medium" color="primary">
                Weight:
              </Typography>
              <Typography>{exercise.weight}</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography fontWeight="medium" color="secondary">
                Sets:
              </Typography>
              <Typography>{exercise.target_sets}</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography fontWeight="medium" color="secondary">
                Reps:
              </Typography>
              <Typography>{exercise.target_reps}</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Box>
              <NumberSpinner
                onValueChange={(e) => handleSpinnerChange(e, true)}
                size="small"
                label="Sets Completed"
                min={0}
                defaultValue={0}
                value={
                  entry ? entry.sets_completed : (exercise.sets_completed ?? 0)
                }
              />
            </Box>
            <Box>
              <NumberSpinner
                onValueChange={(e) => handleSpinnerChange(e, false)}
                size="small"
                label="Reps in Reserve"
                min={0}
                defaultValue={0}
                value={
                  entry
                    ? entry.reps_in_reserve
                    : (exercise.reps_in_reserve ?? 0)
                }
              />
            </Box>
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
