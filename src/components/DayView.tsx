import { useState } from "react";
import { Box, Button, Alert, Stack, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
  const [optionalOpen, setOptionalOpen] = useState(false);

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
          <Box
            onClick={() => setOptionalOpen(!optionalOpen)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.75,
              mt: 2,
              mb: 1.5,
              py: 1,
              mx: 1,
              borderRadius: "8px",
              cursor: "pointer",
              bgcolor: "rgba(255,255,255,0.03)",
              border: 1,
              borderColor: "rgba(255,255,255,0.08)",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.12)",
              },
            }}
          >
            <Typography
              color="text.secondary"
              fontSize="0.8rem"
              fontWeight={500}
            >
              {optionalOpen ? "Hide" : "Show"} optional ({optionalToShow.length})
            </Typography>
            <ExpandMoreIcon
              sx={{
                fontSize: 18,
                color: "text.secondary",
                transition: "transform 0.2s ease",
                transform: optionalOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </Box>
          {optionalOpen &&
            optionalToShow.map((exercise, key) => (
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
