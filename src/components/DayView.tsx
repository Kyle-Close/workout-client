import { Button, Divider, Alert, Stack } from "@mui/material";
import { useExerciseLogForm } from "../hooks/useExerciseLogForm";
import type { ExerciseForDayView } from "../schemas/currentWeekSchema";
import { ExerciseAccordian } from "./ExerciseAccordian";

interface DayViewProps {
  exerciseLogs: ExerciseForDayView[];
}

export function DayView({ exerciseLogs }: DayViewProps) {
  const { formData, setFormData, handleSubmit, completeDayMutation } =
    useExerciseLogForm();

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

      <Divider sx={{ m: 2, "& .MuiDivider-wrapper": { fontStyle: "italic" } }}>
        Optional
      </Divider>

      {exerciseLogs.map((exercise, key) => {
        if (exercise.optional) {
          return (
            <ExerciseAccordian
              titleFontWeight="lighter"
              exercise={exercise}
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
        <Alert severity="success">Successfully updated exercise log(s).</Alert>
      )}

      {completeDayMutation.isError && (
        <Alert severity="error">
          There was an error updating the logs. At least 1 field must be
          changed.
        </Alert>
      )}
    </Stack>
  );
}
