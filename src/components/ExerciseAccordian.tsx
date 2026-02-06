import { useState } from "react";
import type { ExerciseForDayView } from "../schemas/currentWeekSchema";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, Chip, Divider, Stack } from "@mui/material";
import NumberSpinner from "./NumberSpinner";
import { USER_ID } from "../globals";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import type { ExerciseLogFormEntry } from "../hooks/useExerciseLogForm";
import { PlateVisualizer } from "./PlateVisualizer";
import { ExerciseHistoryModal } from "./ExerciseHistoryModal";

interface ExerciseAccordianProps {
  titleFontWeight: string;
  exercise: ExerciseForDayView;
  formData: ExerciseLogFormEntry[];
  setFormData: React.Dispatch<React.SetStateAction<ExerciseLogFormEntry[]>>;
}

export function ExerciseAccordian({
  titleFontWeight,
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
        const item: ExerciseLogFormEntry = {
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
  const [historyOpen, setHistoryOpen] = useState(false);

  const setsHit =
    exercise.sets_completed != null &&
    exercise.sets_completed >= exercise.target_sets;

  return (
    <Accordion
      disableGutters
      sx={{
        borderRadius: "12px !important",
        mb: 1.5,
        "&::before": { display: "none" },
        backgroundImage: "none",
        bgcolor: exercise.completed
          ? "rgba(46, 125, 50, 0.08)"
          : "rgba(255,255,255,0.03)",
        border: 1,
        borderColor: exercise.completed
          ? "rgba(46, 125, 50, 0.3)"
          : "rgba(255,255,255,0.08)",
        overflow: "hidden",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          px: 2,
          py: 0.5,
          minHeight: 56,
          "& .MuiAccordionSummary-content": { my: 1.5 },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          mr={1}
        >
          <Stack direction="row" gap={1.5} alignItems="center">
            {exercise.completed ? (
              <DoneAllIcon color="success" fontSize="small" />
            ) : (
              <FitnessCenterIcon
                sx={{ color: "text.secondary", fontSize: 20 }}
              />
            )}
            <Typography
              fontWeight={titleFontWeight}
              fontSize={{ xs: "0.95rem", sm: "1.1rem" }}
              component="span"
              color={exercise.completed ? "success.main" : "text.primary"}
              sx={{ lineHeight: 1.3 }}
            >
              {exercise.exercise_name}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.75}>
            {exercise.weight_change != null && exercise.weight_change !== 0 && (
              <Stack
                direction="row"
                alignItems="center"
                spacing={0.25}
                sx={{
                  px: 0.75,
                  py: 0.25,
                  borderRadius: "6px",
                  bgcolor:
                    exercise.weight_change > 0
                      ? "rgba(46, 125, 50, 0.15)"
                      : "rgba(211, 47, 47, 0.15)",
                }}
              >
                {exercise.weight_change > 0 ? (
                  <TrendingUpIcon
                    sx={{
                      fontSize: 14,
                      color: "success.main",
                    }}
                  />
                ) : (
                  <TrendingDownIcon
                    sx={{
                      fontSize: 14,
                      color: "error.main",
                    }}
                  />
                )}
                <Typography
                  sx={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    color:
                      exercise.weight_change > 0 ? "success.main" : "error.main",
                  }}
                >
                  {Math.abs(exercise.weight_change)}
                </Typography>
              </Stack>
            )}
            <Chip
              label={`${exercise.weight} lbs`}
              size="small"
              variant="outlined"
              sx={{
                fontWeight: 600,
                fontSize: "0.75rem",
                borderColor: "primary.main",
                color: "primary.main",
              }}
            />
          </Stack>
        </Stack>
      </AccordionSummary>

      <AccordionDetails sx={{ px: 2, pt: 0, pb: 2.5 }}>
        {/* Target stats and history button */}
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="stretch"
          sx={{ mb: 2.5 }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              flex: 1,
              p: 1.5,
              borderRadius: "8px",
              bgcolor: "rgba(255,255,255,0.04)",
            }}
          >
            <Box
              sx={{
                flex: 1,
                textAlign: "center",
                py: 0.5,
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
              >
                Target Sets
              </Typography>
              <Typography fontWeight={600} fontSize="1.1rem">
                {exercise.target_sets}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "1px",
                bgcolor: "rgba(255,255,255,0.1)",
                alignSelf: "stretch",
              }}
            />
            <Box
              sx={{
                flex: 1,
                textAlign: "center",
                py: 0.5,
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
              >
                Target Reps
              </Typography>
              <Typography fontWeight={600} fontSize="1.1rem">
                {exercise.target_reps}
              </Typography>
            </Box>
          </Stack>
          <Button
            variant="outlined"
            onClick={() => setHistoryOpen(true)}
            sx={{
              minWidth: 0,
              px: 1.5,
              borderRadius: "8px",
              borderColor: "rgba(255,255,255,0.12)",
              color: "text.secondary",
              display: "flex",
              flexDirection: "column",
              gap: 0.25,
              "&:hover": {
                borderColor: "primary.main",
                color: "primary.main",
                bgcolor: "rgba(144, 202, 249, 0.08)",
              },
            }}
          >
            <ShowChartIcon sx={{ fontSize: 20 }} />
            <Typography
              variant="caption"
              sx={{ fontSize: "0.6rem", textTransform: "none" }}
            >
              History
            </Typography>
          </Button>
        </Stack>

        {/* Input / completed results */}
        {!exercise.completed ? (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems="stretch"
          >
            {/* Spinners section */}
            <Stack
              direction="row"
              spacing={4}
              sx={{ flex: 1, minWidth: 0 }}
              alignSelf="center"
            >
              <Box>
                <NumberSpinner
                  onValueChange={(e) => handleSpinnerChange(e, true)}
                  size="small"
                  label="Sets Completed"
                  min={0}
                  defaultValue={0}
                  value={
                    entry
                      ? entry.sets_completed
                      : (exercise.sets_completed ?? 0)
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
            </Stack>

            {/* Plate visualizer section */}
            {exercise.plates &&
              Object.values(exercise.plates).some((count) => count > 0) && (
                <>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      display: { xs: "none", sm: "block" },
                      borderColor: "rgba(255,255,255,0.08)",
                    }}
                  />
                  <Divider
                    sx={{
                      display: { xs: "block", sm: "none" },
                      borderColor: "rgba(255,255,255,0.08)",
                    }}
                  />
                  <Box
                    sx={{
                      flex: 1,
                      minWidth: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      p: 1,
                      borderRadius: "8px",
                      bgcolor: "rgba(255,255,255,0.02)",
                    }}
                  >
                    <PlateVisualizer plates={exercise.plates} />
                  </Box>
                </>
              )}
          </Stack>
        ) : (
          <Stack direction="row" spacing={1.5} justifyContent="center">
            <Box
              sx={{
                flex: 1,
                textAlign: "center",
                py: 1.5,
                px: 1,
                borderRadius: "8px",
                bgcolor: setsHit
                  ? "rgba(46, 125, 50, 0.12)"
                  : "rgba(211, 47, 47, 0.12)",
                border: 1,
                borderColor: setsHit
                  ? "rgba(46, 125, 50, 0.3)"
                  : "rgba(211, 47, 47, 0.3)",
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
              >
                Sets Completed
              </Typography>
              <Typography
                fontWeight={700}
                fontSize="1.25rem"
                color={setsHit ? "success.main" : "error.main"}
              >
                {exercise.sets_completed}
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                textAlign: "center",
                py: 1.5,
                px: 1,
                borderRadius: "8px",
                bgcolor:
                  exercise.reps_in_reserve != null &&
                  exercise.reps_in_reserve >= 0
                    ? "rgba(46, 125, 50, 0.12)"
                    : "rgba(211, 47, 47, 0.12)",
                border: 1,
                borderColor:
                  exercise.reps_in_reserve != null &&
                  exercise.reps_in_reserve >= 0
                    ? "rgba(46, 125, 50, 0.3)"
                    : "rgba(211, 47, 47, 0.3)",
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
              >
                Reps in Reserve
              </Typography>
              <Typography
                fontWeight={700}
                fontSize="1.25rem"
                color={
                  exercise.reps_in_reserve != null &&
                  exercise.reps_in_reserve >= 0
                    ? "success.main"
                    : "error.main"
                }
              >
                {exercise.reps_in_reserve}
              </Typography>
            </Box>
          </Stack>
        )}

        {/* History Modal */}
        <ExerciseHistoryModal
          open={historyOpen}
          onClose={() => setHistoryOpen(false)}
          exerciseId={exercise.exercise_id}
          exerciseName={exercise.exercise_name}
        />
      </AccordionDetails>
    </Accordion>
  );
}
