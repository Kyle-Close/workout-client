import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  useGetPrograms,
  useGetProgramDetail,
  useUpdateProgramName,
  useUpdateProgramExercises,
  useDeleteProgram,
} from "../../../hooks/usePrograms";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type {
  ProgramDay,
  ProgramExercise,
} from "../../../schemas/programSchema";

export const Route = createFileRoute("/users/$userId/program")({
  component: RouteComponent,
});

const EQUIPMENT_COLORS: Record<string, string> = {
  BARBELL: "#90caf9",
  DUMBBELL: "#ce93d8",
  MACHINE: "#a5d6a7",
  "BODY WEIGHT": "#ffcc80",
};

type ExerciseEdits = Record<
  number,
  { target_sets: number; target_reps: number; intensity: number }
>;

function ExerciseRow({
  exercise,
  editing,
  edits,
  onEdit,
}: {
  exercise: ProgramExercise;
  editing: boolean;
  edits?: { target_sets: number; target_reps: number; intensity: number };
  onEdit?: (values: {
    target_sets: number;
    target_reps: number;
    intensity: number;
  }) => void;
}) {
  const equipmentColor = EQUIPMENT_COLORS[exercise.equipment_type] || "#9e9e9e";
  const sets = edits?.target_sets ?? exercise.target_sets;
  const reps = edits?.target_reps ?? exercise.target_reps;
  const intensity = edits?.intensity ?? exercise.intensity;

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
          height: editing ? "auto" : 32,
          alignSelf: "stretch",
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
        {editing ? (
          <Stack direction="row" gap={1} mt={0.75}>
            <TextField
              label="Sets"
              size="small"
              type="number"
              value={sets}
              onChange={(e) =>
                onEdit?.({ target_sets: Number(e.target.value), target_reps: reps, intensity })
              }
              sx={{ flex: 1 }}
              slotProps={{ htmlInput: { min: 1 } }}
            />
            <TextField
              label="Reps"
              size="small"
              type="number"
              value={reps}
              onChange={(e) =>
                onEdit?.({ target_sets: sets, target_reps: Number(e.target.value), intensity })
              }
              sx={{ flex: 1 }}
              slotProps={{ htmlInput: { min: 1 } }}
            />
            <TextField
              label="Intensity %"
              size="small"
              type="number"
              value={intensity}
              onChange={(e) =>
                onEdit?.({ target_sets: sets, target_reps: reps, intensity: Number(e.target.value) })
              }
              sx={{ flex: 1 }}
              slotProps={{ htmlInput: { min: 1, max: 100 } }}
            />
          </Stack>
        ) : (
          <Stack direction="row" justifyContent="space-between" gap={2} mt={0.25}>
            <Typography variant="caption" color="text.secondary">
              {sets} x {reps}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {intensity}%
            </Typography>
          </Stack>
        )}
      </Box>
    </Box>
  );
}

function DayAccordion({
  day,
  editing,
  edits,
  onEdit,
}: {
  day: ProgramDay;
  editing: boolean;
  edits: ExerciseEdits;
  onEdit: (
    exerciseId: number,
    values: { target_sets: number; target_reps: number; intensity: number },
  ) => void;
}) {
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
          {day.exercises.map((exercise) => (
            <ExerciseRow
              key={exercise.id}
              exercise={exercise}
              editing={editing}
              edits={edits[exercise.id]}
              onEdit={(values) => onEdit(exercise.id, values)}
            />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

function ProgramDetail({
  programId,
  userId,
  onBack,
}: {
  programId: number;
  userId: string;
  onBack: () => void;
}) {
  const { data, isLoading, isError, error } = useGetProgramDetail(programId);
  const deleteProgram = useDeleteProgram();
  const updateExercises = useUpdateProgramExercises(programId);
  const updateName = useUpdateProgramName(programId);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [editing, setEditing] = useState(false);
  const [edits, setEdits] = useState<ExerciseEdits>({});
  const [editedName, setEditedName] = useState("");

  const handleEditExercise = (
    exerciseId: number,
    values: { target_sets: number; target_reps: number; intensity: number },
  ) => {
    setEdits((prev) => ({ ...prev, [exerciseId]: values }));
  };

  const handleSave = async () => {
    if (!data) return;
    try {
      const nameChanged = editedName.trim() && editedName.trim() !== data.name;
      if (nameChanged) {
        await updateName.mutateAsync(editedName.trim());
      }
      const allExercises = data.days.flatMap((day) => day.exercises);
      const payload = allExercises.map((ex) => ({
        id: ex.id,
        target_sets: edits[ex.id]?.target_sets ?? ex.target_sets,
        target_reps: edits[ex.id]?.target_reps ?? ex.target_reps,
        intensity: edits[ex.id]?.intensity ?? ex.intensity,
      }));
      const hasExerciseEdits = Object.keys(edits).length > 0;
      if (hasExerciseEdits) {
        await updateExercises.mutateAsync(payload);
      }
      setEditing(false);
      setEdits({});
      setEditedName("");
    } catch {
      // errors available via updateName.error / updateExercises.error
    }
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEdits({});
    setEditedName("");
  };

  const handleDelete = async () => {
    try {
      await deleteProgram.mutateAsync({
        programId,
        userId: Number(userId),
      });
      setConfirmOpen(false);
      onBack();
    } catch {
      // error is available via deleteProgram.error
    }
  };

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

      {/* Program name + actions */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 0.5 }}
      >
        {editing ? (
          <TextField
            size="small"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            sx={{ flex: 1 }}
          />
        ) : (
          <Typography fontWeight={600} fontSize="1.25rem">
            {data.name}
          </Typography>
        )}
        {!editing && (
          <>
            <IconButton
              size="small"
              onClick={(e) => setMenuAnchor(e.currentTarget)}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={() => setMenuAnchor(null)}
            >
              <MenuItem
                onClick={() => {
                  setMenuAnchor(null);
                  setEditedName(data.name);
                  setEditing(true);
                }}
              >
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setMenuAnchor(null);
                  setConfirmOpen(true);
                }}
              >
                <ListItemIcon>
                  <DeleteOutlineIcon fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText sx={{ color: "error.main" }}>
                  Delete
                </ListItemText>
              </MenuItem>
            </Menu>
          </>
        )}
      </Stack>
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
        <DayAccordion
          key={day.day}
          day={day}
          editing={editing}
          edits={edits}
          onEdit={handleEditExercise}
        />
      ))}

      {/* Edit save/cancel */}
      {editing && (
        <Stack direction="row" gap={1} sx={{ mt: 2 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleSave}
            disabled={updateExercises.isPending || updateName.isPending}
          >
            {updateExercises.isPending || updateName.isPending
              ? "Saving..."
              : "Save Changes"}
          </Button>
          <Button
            fullWidth
            onClick={handleCancelEdit}
            disabled={updateExercises.isPending || updateName.isPending}
          >
            Cancel
          </Button>
        </Stack>
      )}

      {/* Delete confirmation dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Delete Program</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{data.name}"? This will permanently
            remove the program and all associated workout data. This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} disabled={deleteProgram.isPending}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            disabled={deleteProgram.isPending}
          >
            {deleteProgram.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
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
  const navigate = useNavigate();
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
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          No programs found for this account.
        </Typography>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={() =>
            navigate({
              to: "/users/$userId/create-program",
              params: { userId },
            })
          }
        >
          Create Program
        </Button>
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
      <Button
        fullWidth
        startIcon={<AddIcon />}
        onClick={() =>
          navigate({
            to: "/users/$userId/create-program",
            params: { userId },
          })
        }
        sx={{
          mt: 2,
          border: "1px dashed rgba(255,255,255,0.2)",
          borderRadius: "12px",
          color: "text.secondary",
          textTransform: "none",
          py: 1.5,
        }}
      >
        Create Program
      </Button>
    </Box>
  );
}

function RouteComponent() {
  const { userId } = Route.useParams();
  const [selectedProgramId, setSelectedProgramId] = useState<number | null>(
    null,
  );

  return (
    <Box sx={{ px: { xs: 2, sm: 3 }, py: 3 }}>
      {selectedProgramId ? (
        <ProgramDetail
          programId={selectedProgramId}
          userId={userId}
          onBack={() => setSelectedProgramId(null)}
        />
      ) : (
        <ProgramsList userId={userId} onSelect={setSelectedProgramId} />
      )}
    </Box>
  );
}
