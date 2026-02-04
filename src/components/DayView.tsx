import { Button, Divider, Alert, Stack } from "@mui/material";
import { useExerciseLogForm } from "../hooks/useExerciseLogForm";
import type { ExerciseForDayView } from "../schemas/currentWeekSchema";
import { ExerciseAccordian } from "./ExerciseAccordian";

interface DayViewProps {
  exerciseLogs: ExerciseForDayView[];
  readOnly: boolean;
}

export function DayView({ exerciseLogs, readOnly }: DayViewProps) {
  const { formData, setFormData, handleSubmit, completeDayMutation } =
    useExerciseLogForm();

  // Filter optional exercises based on readOnly mode
  const optionalExercises = exerciseLogs.filter(
    (exercise) => exercise.optional,
  );
  const optionalToShow = readOnly
    ? optionalExercises.filter((exercise) => exercise.completed)
    : optionalExercises;

  return (
    <Stack component="form" onSubmit={handleSubmit}>
      {exerciseLogs.map((exercise, key) => {
        if (!exercise.optional) {
          return (
            <ExerciseAccordian
              titleFontWeight={"500"}
              exercise={exercise}
              key={key}
              formData={formData}
              setFormData={setFormData}
            />
          );
        }
      })}
      {optionalToShow.length > 0 && (
        <>
          <Divider
            sx={{ m: 2, "& .MuiDivider-wrapper": { fontStyle: "italic" } }}
          >
            Optional
          </Divider>
          {optionalToShow.map((exercise, key) => (
            <ExerciseAccordian
              titleFontWeight="lighter"
              exercise={exercise}
              key={key}
              formData={formData}
              setFormData={setFormData}
            />
          ))}
        </>
      )}
      {!readOnly && (
        <>
          <Button
            disabled={formData.length === 0}
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: "10px",
              fontWeight: 600,
              fontSize: "0.95rem",
              textTransform: "none",
            }}
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
        </>
      )}
    </Stack>
  );
}
