import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControlLabel,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useGetExercises, useCreateExercise } from "../hooks/useExercises";
import { useCreateProgram } from "../hooks/useCreateProgram";
import type { Exercise } from "../schemas/exerciseSchema";

export const Route = createFileRoute("/create-program")({
  component: RouteComponent,
});

type ExerciseFormEntry = {
  clientId: string;
  exercise_id: number | null;
  target_sets: number;
  target_reps: number;
  intensity: number;
  optional: boolean;
};

type DayFormState = {
  day: number;
  exercises: ExerciseFormEntry[];
};

const EQUIPMENT_TYPES = ["BARBELL", "DUMBBELL", "MACHINE", "BODY WEIGHT"];

function createEmptyExercise(): ExerciseFormEntry {
  return {
    clientId: crypto.randomUUID(),
    exercise_id: null,
    target_sets: 3,
    target_reps: 8,
    intensity: 70,
    optional: false,
  };
}

function ExerciseFormRow({
  entry,
  exercises,
  onUpdate,
  onDelete,
}: {
  entry: ExerciseFormEntry;
  exercises: Exercise[];
  onUpdate: (updated: ExerciseFormEntry) => void;
  onDelete: () => void;
}) {
  const [creatingNew, setCreatingNew] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEquipmentType, setNewEquipmentType] = useState("BARBELL");
  const [newWeightIncrement, setNewWeightIncrement] = useState(5);
  const createExercise = useCreateExercise();

  const selectedExercise = entry.exercise_id
    ? exercises.find((e) => e.id === entry.exercise_id) ?? null
    : null;

  const handleCreateExercise = async () => {
    if (!newName.trim()) return;
    try {
      const created = await createExercise.mutateAsync({
        name: newName.trim(),
        equipment_type: newEquipmentType,
        weight_increment: newWeightIncrement,
      });
      onUpdate({ ...entry, exercise_id: created.id });
      setCreatingNew(false);
      setNewName("");
    } catch {
      // error is available via createExercise.error
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: "10px",
        bgcolor: "rgba(255,255,255,0.04)",
        border: 1,
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      <Stack spacing={2}>
        {/* Header row: delete button */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography fontSize="0.75rem" color="text.secondary" fontWeight={500} textTransform="uppercase" letterSpacing={0.5}>
            Exercise
          </Typography>
          <IconButton size="small" onClick={onDelete} sx={{ color: "text.secondary" }}>
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Stack>

        {/* Exercise selection */}
        {creatingNew ? (
          <Stack spacing={1.5}>
            <TextField
              label="Exercise Name"
              size="small"
              fullWidth
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <Stack direction="row" spacing={1.5}>
              <Select
                size="small"
                value={newEquipmentType}
                onChange={(e) => setNewEquipmentType(e.target.value)}
                sx={{ flex: 1 }}
              >
                {EQUIPMENT_TYPES.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                label="Weight Increment"
                size="small"
                type="number"
                value={newWeightIncrement}
                onChange={(e) =>
                  setNewWeightIncrement(Number(e.target.value))
                }
                sx={{ width: 120 }}
              />
            </Stack>
            {createExercise.isError && (
              <Typography color="error" fontSize="0.8rem">
                {createExercise.error.message}
              </Typography>
            )}
            <Stack direction="row" spacing={1}>
              <Button
                size="small"
                variant="contained"
                onClick={handleCreateExercise}
                disabled={createExercise.isPending || !newName.trim()}
              >
                {createExercise.isPending ? "Creating..." : "Create"}
              </Button>
              <Button
                size="small"
                onClick={() => setCreatingNew(false)}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Autocomplete
            size="small"
            fullWidth
            options={exercises}
            getOptionLabel={(option) =>
              `${option.name} (${option.equipment_type})`
            }
            value={selectedExercise}
            onChange={(_, value) => {
              onUpdate({
                ...entry,
                exercise_id: value ? value.id : null,
              });
            }}
            isOptionEqualToValue={(option, value) =>
              option.id === value.id
            }
            noOptionsText={
              <Button
                size="small"
                onClick={() => setCreatingNew(true)}
                sx={{ textTransform: "none" }}
              >
                Create new exercise
              </Button>
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search exercises"
                placeholder="Type to search..."
              />
            )}
          />
        )}

        {/* Configuration */}
        <Box>
          <Typography
            fontSize="0.75rem"
            color="text.secondary"
            fontWeight={500}
            textTransform="uppercase"
            letterSpacing={0.5}
            sx={{ mb: 1 }}
          >
            Configuration
          </Typography>
          <Stack direction="row" spacing={1.5}>
            <TextField
              label="Sets"
              size="small"
              type="number"
              value={entry.target_sets}
              onChange={(e) =>
                onUpdate({ ...entry, target_sets: Number(e.target.value) })
              }
              sx={{ flex: 1 }}
              slotProps={{ htmlInput: { min: 1 } }}
            />
            <TextField
              label="Reps"
              size="small"
              type="number"
              value={entry.target_reps}
              onChange={(e) =>
                onUpdate({ ...entry, target_reps: Number(e.target.value) })
              }
              sx={{ flex: 1 }}
              slotProps={{ htmlInput: { min: 1 } }}
            />
            <TextField
              label="Intensity"
              size="small"
              type="number"
              value={entry.intensity}
              onChange={(e) =>
                onUpdate({ ...entry, intensity: Number(e.target.value) })
              }
              sx={{ flex: 1 }}
              slotProps={{
                htmlInput: { min: 1, max: 100 },
                input: {
                  endAdornment: (
                    <Tooltip title="Percentage of your one-rep max (1RM) for this exercise" arrow>
                      <InfoOutlinedIcon
                        sx={{ fontSize: 16, color: "text.secondary", cursor: "help" }}
                      />
                    </Tooltip>
                  ),
                },
              }}
            />
          </Stack>
        </Box>

        {/* Optional toggle */}
        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={entry.optional}
              onChange={(e) =>
                onUpdate({ ...entry, optional: e.target.checked })
              }
            />
          }
          label={
            <Typography fontSize="0.85rem" color="text.secondary">
              Optional
            </Typography>
          }
        />
      </Stack>
    </Box>
  );
}

function DayCard({
  dayState,
  exercises,
  onUpdate,
}: {
  dayState: DayFormState;
  exercises: Exercise[];
  onUpdate: (updated: DayFormState) => void;
}) {
  const handleUpdateExercise = (
    index: number,
    updated: ExerciseFormEntry,
  ) => {
    const newExercises = [...dayState.exercises];
    newExercises[index] = updated;
    onUpdate({ ...dayState, exercises: newExercises });
  };

  const handleDeleteExercise = (index: number) => {
    const newExercises = dayState.exercises.filter((_, i) => i !== index);
    onUpdate({ ...dayState, exercises: newExercises });
  };

  const handleAddExercise = () => {
    onUpdate({
      ...dayState,
      exercises: [...dayState.exercises, createEmptyExercise()],
    });
  };

  return (
    <Box
      sx={{
        borderRadius: "12px",
        bgcolor: "rgba(255,255,255,0.03)",
        border: 1,
        borderColor: "rgba(255,255,255,0.08)",
        overflow: "hidden",
      }}
    >
      {/* Day header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 2, py: 1.5 }}
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
              {dayState.day}
            </Typography>
          </Box>
          <Typography fontWeight={500} fontSize="1rem">
            Day {dayState.day}
          </Typography>
        </Stack>
        <Chip
          label={`${dayState.exercises.length} exercise${dayState.exercises.length !== 1 ? "s" : ""}`}
          size="small"
          sx={{
            height: 22,
            fontSize: "0.7rem",
            bgcolor: "rgba(144, 202, 249, 0.12)",
            color: "primary.main",
          }}
        />
      </Stack>

      {/* Exercises */}
      <Stack spacing={1} sx={{ px: 2, pb: 2 }}>
        {dayState.exercises.map((entry, idx) => (
          <ExerciseFormRow
            key={entry.clientId}
            entry={entry}
            exercises={exercises}
            onUpdate={(updated) => handleUpdateExercise(idx, updated)}
            onDelete={() => handleDeleteExercise(idx)}
          />
        ))}
        <Button
          onClick={handleAddExercise}
          sx={{
            border: "1px dashed rgba(255,255,255,0.2)",
            borderRadius: "8px",
            color: "text.secondary",
            textTransform: "none",
            py: 1,
          }}
          startIcon={<AddIcon />}
        >
          Add Exercise
        </Button>
      </Stack>
    </Box>
  );
}

function RouteComponent() {
  const navigate = useNavigate();
  const { data: exercises = [] } = useGetExercises();
  const createProgram = useCreateProgram();

  const [programName, setProgramName] = useState("");
  const [days, setDays] = useState<DayFormState[]>([
    { day: 1, exercises: [] },
  ]);
  const [error, setError] = useState<string | null>(null);

  const handleDayCountChange = (delta: number) => {
    const newCount = Math.max(1, Math.min(7, days.length + delta));
    if (newCount > days.length) {
      setDays([...days, { day: newCount, exercises: [] }]);
    } else if (newCount < days.length) {
      setDays(days.slice(0, newCount));
    }
  };

  const handleUpdateDay = (index: number, updated: DayFormState) => {
    const newDays = [...days];
    newDays[index] = updated;
    setDays(newDays);
  };

  const handleSubmit = async () => {
    setError(null);

    // Validation
    if (!programName.trim()) {
      setError("Program name is required");
      return;
    }

    for (const day of days) {
      if (day.exercises.length === 0) {
        setError(`Day ${day.day} must have at least 1 exercise`);
        return;
      }
      for (const ex of day.exercises) {
        if (!ex.exercise_id) {
          setError(`All exercises on Day ${day.day} must be selected`);
          return;
        }
        if (ex.target_sets < 1 || ex.target_reps < 1 || ex.intensity < 1) {
          setError(
            `All exercises on Day ${day.day} must have valid sets, reps, and intensity`,
          );
          return;
        }
      }
    }

    // Build payload
    const exercisePayload = days.flatMap((day) =>
      day.exercises.map((ex) => ({
        exercise_id: ex.exercise_id!,
        workout_day: day.day,
        target_sets: ex.target_sets,
        target_reps: ex.target_reps,
        intensity: ex.intensity,
        optional: ex.optional,
      })),
    );

    try {
      await createProgram.mutateAsync({
        name: programName.trim(),
        exercises: exercisePayload,
      });
      navigate({ to: "/setup-maxes" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create program. Please try again.");
    }
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 3 }, py: 3 }}>
      {/* Back link */}
      <Stack
        direction="row"
        alignItems="center"
        gap={1.5}
        sx={{ mb: 3, cursor: "pointer" }}
        onClick={() => navigate({ to: "/account" })}
      >
        <ArrowBackIcon sx={{ color: "text.secondary", fontSize: 20 }} />
        <Typography color="text.secondary" fontSize="0.9rem">
          Back to account
        </Typography>
      </Stack>

      {/* Header */}
      <Typography fontWeight={600} fontSize="1.25rem" sx={{ mb: 3 }}>
        Create Program
      </Typography>

      {/* Program name */}
      <TextField
        label="Program Name"
        fullWidth
        value={programName}
        onChange={(e) => setProgramName(e.target.value)}
        sx={{ mb: 3 }}
      />

      {/* Training Days */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography fontWeight={500} fontSize="1rem">
          Training Days
        </Typography>
        <Stack direction="row" alignItems="center" gap={1}>
          <IconButton
            size="small"
            onClick={() => handleDayCountChange(-1)}
            disabled={days.length <= 1}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography fontWeight={600} fontSize="1rem" sx={{ minWidth: 20, textAlign: "center" }}>
            {days.length}
          </Typography>
          <IconButton
            size="small"
            onClick={() => handleDayCountChange(1)}
            disabled={days.length >= 7}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      {/* Day cards */}
      <Stack spacing={2} sx={{ mb: 3 }}>
        {days.map((dayState, idx) => (
          <DayCard
            key={dayState.day}
            dayState={dayState}
            exercises={exercises}
            onUpdate={(updated) => handleUpdateDay(idx, updated)}
          />
        ))}
      </Stack>

      {/* Error */}
      {(error || createProgram.isError) && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || createProgram.error?.message}
        </Alert>
      )}

      {/* Submit */}
      <Button
        fullWidth
        variant="contained"
        onClick={handleSubmit}
        disabled={createProgram.isPending}
      >
        {createProgram.isPending ? "Creating..." : "Create Program"}
      </Button>
    </Box>
  );
}
