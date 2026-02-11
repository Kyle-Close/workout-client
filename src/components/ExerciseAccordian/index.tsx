import { useState } from "react";
import type { ExerciseForDayView } from "../../schemas/currentWeekSchema";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Chip, Stack } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import type { ExerciseLogFormEntry } from "../../hooks/useExerciseLogForm";
import { PlateVisualizer } from "../PlateVisualizer";
import { ExerciseHistoryModal } from "../ExerciseHistoryModal";
import { useExerciseFormEntry } from "./useExerciseFormEntry";
import { WeightChangeBadge } from "./WeightChangeBadge";
import { TargetStatsCard } from "./TargetStatsCard";
import { NumberSpinnerInput } from "./NumberSpinnerInput";
import { NoteSection } from "./NoteSection";
import { CompletedResults } from "./CompletedResults";

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
  const [historyOpen, setHistoryOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);

  const {
    setsValue,
    rirValue,
    notesValue,
    handleSetsChange,
    handleRepsInReserveChange,
    handleNoteChange,
  } = useExerciseFormEntry(exercise, formData, setFormData);

  const hasPlates = exercise.plates && Object.values(exercise.plates).some((count) => count > 0);

  return (
    <Accordion
      disableGutters
      sx={{
        borderRadius: "12px !important",
        mb: 1.5,
        "&::before": { display: "none" },
        backgroundImage: "none",
        bgcolor: exercise.completed ? "rgba(46, 125, 50, 0.08)" : "rgba(255,255,255,0.03)",
        border: 1,
        borderColor: exercise.completed ? "rgba(46, 125, 50, 0.3)" : "rgba(255,255,255,0.08)",
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
              <FitnessCenterIcon sx={{ color: "text.secondary", fontSize: 20 }} />
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
            {exercise.weight_change != null && (
              <WeightChangeBadge weightChange={exercise.weight_change} />
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

      <AccordionDetails sx={{ px: 2, pt: 0, pb: 2, overflow: "hidden" }}>
        <TargetStatsCard
          targetSets={exercise.target_sets}
          targetReps={exercise.target_reps}
          onHistoryClick={() => setHistoryOpen(true)}
        />

        {!exercise.completed ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
              <NumberSpinnerInput
                label="Sets Completed"
                value={setsValue}
                onIncrement={() => handleSetsChange(setsValue + 1)}
                onDecrement={() => handleSetsChange(Math.max(0, setsValue - 1))}
              />
              <NumberSpinnerInput
                label="Reps in Reserve"
                value={rirValue}
                onIncrement={() => handleRepsInReserveChange(rirValue + 1)}
                onDecrement={() => handleRepsInReserveChange(rirValue - 1)}
              />
            </Box>

            {hasPlates && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 1.5,
                  borderRadius: "10px",
                  bgcolor: "rgba(255,255,255,0.04)",
                  border: 1,
                  borderColor: "rgba(255,255,255,0.06)",
                }}
              >
                <PlateVisualizer plates={exercise.plates!} />
              </Box>
            )}

            <NoteSection
              isOpen={noteOpen}
              onToggle={() => setNoteOpen((prev) => !prev)}
              value={notesValue}
              onChange={handleNoteChange}
            />
          </Box>
        ) : (
          <CompletedResults
            setsCompleted={exercise.sets_completed}
            targetSets={exercise.target_sets}
            repsInReserve={exercise.reps_in_reserve}
            notes={exercise.notes}
          />
        )}

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
