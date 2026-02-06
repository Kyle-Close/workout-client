import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useGetPrograms, useGetProgramDetail } from "../../../hooks/usePrograms";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import type { ProgramDay, ProgramExercise } from "../../../schemas/programSchema";

export const Route = createFileRoute("/users/$userId/program")({
  component: RouteComponent,
});

const EQUIPMENT_COLORS: Record<string, string> = {
  BARBELL: "#90caf9",
  DUMBBELL: "#ce93d8",
  MACHINE: "#a5d6a7",
  "BODY WEIGHT": "#ffcc80",
};

function ExerciseRow({ exercise }: { exercise: ProgramExercise }) {
  const equipmentColor = EQUIPMENT_COLORS[exercise.equipment_type] || "#9e9e9e";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        py: 1.25,
        px: 1.5,
        borderRadius: "8px",
        bgcolor: exercise.optional
          ? "rgba(255,255,255,0.02)"
          : "rgba(255,255,255,0.04)",
        border: 1,
        borderColor: exercise.optional
          ? "rgba(255,255,255,0.05)"
          : "rgba(255,255,255,0.08)",
      }}
    >
      <Box
        sx={{
          width: 4,
          height: 32,
          borderRadius: "2px",
          bgcolor: equipmentColor,
          flexShrink: 0,
        }}
      />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography
            fontSize="0.9rem"
            fontWeight={exercise.optional ? 400 : 500}
            color={exercise.optional ? "text.secondary" : "text.primary"}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {exercise.exercise_name}
          </Typography>
          {exercise.optional && (
            <Chip
              label="Optional"
              size="small"
              sx={{
                height: 18,
                fontSize: "0.65rem",
                bgcolor: "rgba(255,255,255,0.06)",
                color: "text.secondary",
              }}
            />
          )}
        </Stack>
        <Stack direction="row" gap={2} mt={0.25}>
          <Typography variant="caption" color="text.secondary">
            {exercise.target_sets} x {exercise.target_reps}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {exercise.intensity}%
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: equipmentColor, fontWeight: 500 }}
          >
            {exercise.equipment_type}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

function DayAccordion({ day }: { day: ProgramDay }) {
  const requiredCount = day.exercises.filter((e) => !e.optional).length;
  const optionalCount = day.exercises.filter((e) => e.optional).length;

  return (
    <Accordion
      disableGutters
      sx={{
        borderRadius: "12px !important",
        mb: 1.5,
        "&::before": { display: "none" },
        backgroundImage: "none",
        bgcolor: "rgba(255,255,255,0.03)",
        border: 1,
        borderColor: "rgba(255,255,255,0.08)",
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
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "8px",
                bgcolor: "rgba(144, 202, 249, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                fontWeight={600}
                fontSize="0.9rem"
                color="primary.main"
              >
                {day.day}
              </Typography>
            </Box>
            <Typography fontWeight={500} fontSize="1rem">
              Day {day.day}
            </Typography>
          </Stack>
          <Stack direction="row" gap={1}>
            <Chip
              label={`${requiredCount} required`}
              size="small"
              sx={{
                height: 22,
                fontSize: "0.7rem",
                bgcolor: "rgba(144, 202, 249, 0.12)",
                color: "primary.main",
              }}
            />
            {optionalCount > 0 && (
              <Chip
                label={`+${optionalCount} optional`}
                size="small"
                sx={{
                  height: 22,
                  fontSize: "0.7rem",
                  bgcolor: "rgba(255,255,255,0.06)",
                  color: "text.secondary",
                }}
              />
            )}
          </Stack>
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 2, pt: 0, pb: 2 }}>
        <Stack spacing={1}>
          {day.exercises.map((exercise, idx) => (
            <ExerciseRow key={idx} exercise={exercise} />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

function ProgramDetail({ programId, onBack }: { programId: number; onBack: () => void }) {
  const { data, isLoading, isError, error } = useGetProgramDetail(programId);

  if (isError) {
    return (
      <Box sx={{ m: 3 }}>
        <Typography color="error">{error.message}</Typography>
      </Box>
    );
  }

  if (isLoading || !data) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "40vh",
        }}
      >
        <CircularProgress size={32} />
      </Box>
    );
  }

  return (
    <Box>
      {/* Back button and header */}
      <Stack
        direction="row"
        alignItems="center"
        gap={1.5}
        sx={{ mb: 3, cursor: "pointer" }}
        onClick={onBack}
      >
        <ArrowBackIcon sx={{ color: "text.secondary", fontSize: 20 }} />
        <Typography color="text.secondary" fontSize="0.9rem">
          Back to programs
        </Typography>
      </Stack>

      {/* Program name */}
      <Typography fontWeight={600} fontSize="1.25rem" sx={{ mb: 0.5 }}>
        {data.name}
      </Typography>
      <Typography color="text.secondary" fontSize="0.85rem" sx={{ mb: 3 }}>
        {data.days.length} day program
      </Typography>

      {/* Equipment legend */}
      <Stack
        direction="row"
        flexWrap="wrap"
        gap={1}
        sx={{
          mb: 3,
          p: 1.5,
          borderRadius: "10px",
          bgcolor: "rgba(255,255,255,0.02)",
        }}
      >
        {Object.entries(EQUIPMENT_COLORS).map(([type, color]) => (
          <Stack key={type} direction="row" alignItems="center" gap={0.5}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "2px",
                bgcolor: color,
              }}
            />
            <Typography variant="caption" color="text.secondary">
              {type}
            </Typography>
          </Stack>
        ))}
      </Stack>

      {/* Days */}
      {data.days.map((day) => (
        <DayAccordion key={day.day} day={day} />
      ))}
    </Box>
  );
}

function ProgramsList({
  userId,
  onSelect,
}: {
  userId: string;
  onSelect: (id: number) => void;
}) {
  const { data, isLoading, isError, error } = useGetPrograms(Number(userId));

  if (isError) {
    return (
      <Box sx={{ m: 3 }}>
        <Typography color="error">{error.message}</Typography>
      </Box>
    );
  }

  if (isLoading || !data) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "40vh",
        }}
      >
        <CircularProgress size={32} />
      </Box>
    );
  }

  if (data.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 6,
          px: 3,
        }}
      >
        <FitnessCenterIcon
          sx={{ fontSize: 48, color: "text.disabled", mb: 2 }}
        />
        <Typography color="text.secondary">
          No programs found for this account.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography fontWeight={600} fontSize="1.1rem" sx={{ mb: 2 }}>
        Your Programs
      </Typography>
      <Stack spacing={1.5}>
        {data.map((program) => (
          <Box
            key={program.id}
            onClick={() => onSelect(program.id)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 2,
              borderRadius: "12px",
              bgcolor: "rgba(255,255,255,0.03)",
              border: 1,
              borderColor: "rgba(255,255,255,0.08)",
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.06)",
                borderColor: "rgba(255,255,255,0.15)",
              },
              "&:active": {
                bgcolor: "rgba(255,255,255,0.08)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: "10px",
                bgcolor: "rgba(144, 202, 249, 0.12)",
                color: "primary.main",
                flexShrink: 0,
              }}
            >
              <FitnessCenterIcon fontSize="small" />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                fontWeight={500}
                fontSize="0.95rem"
                color="text.primary"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {program.name}
              </Typography>
            </Box>
            <ChevronRightIcon sx={{ color: "text.secondary", flexShrink: 0 }} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

function RouteComponent() {
  const { userId } = Route.useParams();
  const [selectedProgramId, setSelectedProgramId] = useState<number | null>(
    null
  );

  return (
    <Box sx={{ px: { xs: 2, sm: 3 }, py: 3 }}>
      {selectedProgramId ? (
        <ProgramDetail
          programId={selectedProgramId}
          onBack={() => setSelectedProgramId(null)}
        />
      ) : (
        <ProgramsList userId={userId} onSelect={setSelectedProgramId} />
      )}
    </Box>
  );
}
