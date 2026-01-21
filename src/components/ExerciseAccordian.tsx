import type { ExerciseForDayView } from "../schemas/currentWeekSchema";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Divider, Stack } from "@mui/material";
import NumberSpinner from "./NumberSpinner";
import type { ExerciseLogFormItem } from "./WeeklyView";
import { USER_ID } from "../globals";
import DoneAllIcon from '@mui/icons-material/DoneAll';

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
    if (value === null || value === undefined) return;

    setFormData((prevFormData) => {
      const entry = prevFormData.find(
        (log) => log.id === exercise.exercise_log_id,
      );

      if (!entry) {
        const item: ExerciseLogFormItem = {
          id: exercise.exercise_log_id,
          user_id: USER_ID,
          workout_day_exercise_id: exercise.workout_day_exercise_id,
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
        <Stack gap={2} flexDirection={'row'} alignItems={'center'}>
          {exercise.completed && <DoneAllIcon color="success" />}
          <Typography variant="h6" component="span" color={exercise.completed ? 'success' : ''}>
            {exercise.exercise_name}
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2} ml={1} mr={1}>
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
          <Divider />
          {!exercise.completed ?
            <Stack direction="row" spacing={1} justifyContent="space-between">
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
                  defaultValue={0}
                  value={
                    entry
                      ? entry.reps_in_reserve
                      : (exercise.reps_in_reserve ?? 0)
                  }
                />
              </Box>
            </Stack> :
            <Stack flexDirection={'row'} justifyContent={'space-around'}>
              <Stack alignItems={'center'} gap={1}>
                <Typography fontWeight={'medium'}>Sets Completed</Typography>
                <Typography color={exercise.sets_completed && exercise.sets_completed >= exercise.target_sets ? 'success' : 'error'}>{exercise.sets_completed}</Typography>
              </Stack>
              <Stack alignItems={'center'} gap={1}>
                <Typography fontWeight={'medium'}>Reps in Reserve</Typography>
                <Typography color={exercise.reps_in_reserve && exercise.reps_in_reserve >= 0 ? 'success' : 'error'}>{exercise.reps_in_reserve}</Typography>
              </Stack>
            </Stack>
          }
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
