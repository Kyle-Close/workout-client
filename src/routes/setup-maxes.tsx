import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import { useState, useMemo } from "react";
import {
  useGetProgramDetail,
  useActiveProgramId,
  useGenerateWeekLogs,
} from "../hooks/usePrograms";
import { useSetOneRepMaxes } from "../hooks/useOneRepMax";
import { useCreateUserWeight } from "../hooks/useUserWeight";

export const Route = createFileRoute("/setup-maxes")({
  component: SetupMaxesPage,
});

function getTodayString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function SetupMaxesPage() {
  const navigate = useNavigate();
  const activeProgramId = useActiveProgramId();
  const {
    data: program,
    isLoading,
    isError,
  } = useGetProgramDetail(activeProgramId ?? 0);
  const setMaxes = useSetOneRepMaxes();
  const generateLogs = useGenerateWeekLogs();
  const createUserWeight = useCreateUserWeight();
  const [maxInputs, setMaxInputs] = useState<Record<number, string>>({});
  const [bodyWeight, setBodyWeight] = useState("");

  // Extract unique exercises from the program
  const uniqueExercises = useMemo(() => {
    if (!program) return [];

    const exerciseMap = new Map<
      number,
      { exercise_id: number; exercise_name: string; equipment_type: string }
    >();

    for (const day of program.days) {
      for (const exercise of day.exercises) {
        if (!exerciseMap.has(exercise.exercise_id)) {
          exerciseMap.set(exercise.exercise_id, {
            exercise_id: exercise.exercise_id,
            exercise_name: exercise.exercise_name,
            equipment_type: exercise.equipment_type,
          });
        }
      }
    }

    return Array.from(exerciseMap.values());
  }, [program]);

  // Check if program has any assisted exercises (require user's body weight)
  const hasAssistedExercises = useMemo(() => {
    return uniqueExercises.some((ex) =>
      ex.exercise_name.toLowerCase().includes("assisted"),
    );
  }, [uniqueExercises]);

  const handleInputChange = (exerciseId: number, value: string) => {
    setMaxInputs((prev) => ({ ...prev, [exerciseId]: value }));
  };

  const allMaxesFilled = uniqueExercises.every(
    (ex) => maxInputs[ex.exercise_id] && Number(maxInputs[ex.exercise_id]) > 0,
  );

  const bodyWeightFilled =
    !hasAssistedExercises || (bodyWeight && Number(bodyWeight) > 0);

  const allFieldsFilled = allMaxesFilled && bodyWeightFilled;

  const handleSubmit = async () => {
    if (!activeProgramId) return;

    const maxes = uniqueExercises.map((ex) => ({
      exercise_id: ex.exercise_id,
      one_rep_max: Number(maxInputs[ex.exercise_id]),
    }));

    try {
      // Save body weight first if needed
      if (hasAssistedExercises && bodyWeight) {
        await createUserWeight.mutateAsync({
          weight: Number(bodyWeight),
          date: getTodayString(),
        });
      }

      await setMaxes.mutateAsync(maxes);
      await generateLogs.mutateAsync(activeProgramId);
      navigate({ to: "/dashboard" });
    } catch {
      // Error handled by mutation state
    }
  };

  const isSubmitting =
    setMaxes.isPending || generateLogs.isPending || createUserWeight.isPending;

  if (!activeProgramId) {
    return (
      <Box sx={{ px: { xs: 2, sm: 3 }, py: 4, textAlign: "center" }}>
        <Typography color="text.secondary">
          No active program found. Please create or select a program first.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate({ to: "/program" })}
          sx={{ mt: 2 }}
        >
          Go to Programs
        </Button>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress size={32} />
      </Box>
    );
  }

  if (isError || !program) {
    return (
      <Box sx={{ px: { xs: 2, sm: 3 }, py: 4, textAlign: "center" }}>
        <Typography color="error">Failed to load program details.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ px: { xs: 2, sm: 3 }, py: 3 }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: "16px",
            background:
              "linear-gradient(135deg, rgba(144,202,249,0.2) 0%, rgba(144,202,249,0.05) 100%)",
            border: "1px solid rgba(144,202,249,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2,
          }}
        >
          <FitnessCenterIcon sx={{ fontSize: 32, color: "primary.main" }} />
        </Box>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
          Set Your Starting Weights
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 400, mx: "auto" }}>
          Enter your estimated one-rep max for each exercise. This helps
          calculate your working weights.
        </Typography>
      </Box>

      {/* Program name */}
      <Typography
        fontSize="0.85rem"
        color="text.secondary"
        sx={{ mb: 3, textAlign: "center" }}
      >
        Program: <strong>{program.name}</strong>
      </Typography>

      {/* Body weight input - only shown if program has assisted exercises */}
      {hasAssistedExercises && (
        <Box
          sx={{
            p: 2.5,
            mb: 3,
            borderRadius: "12px",
            background:
              "linear-gradient(135deg, rgba(255,183,77,0.1) 0%, rgba(255,183,77,0.03) 100%)",
            border: "1px solid rgba(255,183,77,0.2)",
          }}
        >
          <Stack direction="row" alignItems="center" gap={1.5} sx={{ mb: 1.5 }}>
            <MonitorWeightIcon sx={{ fontSize: 20, color: "#ffb74d" }} />
            <Typography fontWeight={600} fontSize="0.95rem">
              Your Body Weight
            </Typography>
          </Stack>
          <Typography color="text.secondary" fontSize="0.8rem" sx={{ mb: 2 }}>
            Your program includes assisted exercises. We need your weight to
            calculate the correct load.
          </Typography>
          <TextField
            fullWidth
            size="small"
            type="number"
            placeholder="Enter your weight"
            value={bodyWeight}
            onChange={(e) => setBodyWeight(e.target.value)}
            slotProps={{
              htmlInput: { min: 1 },
              input: {
                endAdornment: (
                  <InputAdornment position="end">lbs</InputAdornment>
                ),
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "rgba(255,255,255,0.03)",
              },
            }}
          />
        </Box>
      )}

      {/* Exercise inputs */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        {uniqueExercises.map((exercise) => (
          <Box
            key={exercise.exercise_id}
            sx={{
              p: 2,
              borderRadius: "12px",
              bgcolor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Typography fontWeight={500} fontSize="0.95rem" sx={{ mb: 1.5 }}>
              {exercise.exercise_name}
            </Typography>
            <TextField
              fullWidth
              size="small"
              type="number"
              placeholder="Enter weight"
              value={maxInputs[exercise.exercise_id] || ""}
              onChange={(e) =>
                handleInputChange(exercise.exercise_id, e.target.value)
              }
              slotProps={{
                htmlInput: { min: 1 },
                input: {
                  endAdornment: (
                    <InputAdornment position="end">lbs</InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255,255,255,0.03)",
                },
              }}
            />
          </Box>
        ))}
      </Stack>

      {/* Helper text */}
      <Typography
        fontSize="0.8rem"
        color="text.secondary"
        sx={{ mb: 3, textAlign: "center" }}
      >
        Not sure? Estimate based on a weight you could lift for 1 rep with good
        form.
      </Typography>

      {/* Submit button */}
      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={handleSubmit}
        disabled={!allFieldsFilled || isSubmitting}
        sx={{
          py: 1.5,
          borderRadius: "12px",
          textTransform: "none",
          fontWeight: 600,
          fontSize: "1rem",
        }}
      >
        {isSubmitting ? "Setting up..." : "Start Training"}
      </Button>

      {(setMaxes.isError ||
        generateLogs.isError ||
        createUserWeight.isError) && (
        <Typography
          color="error"
          fontSize="0.85rem"
          sx={{ mt: 2, textAlign: "center" }}
        >
          Failed to save. Please try again.
        </Typography>
      )}
    </Box>
  );
}
