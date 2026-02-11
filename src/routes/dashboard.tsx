import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { WeeklyView } from "../components/WeeklyView";
import { useDaySelector } from "../hooks/useDaySelector";
import { useGetActiveWeekLogs } from "../hooks/useGetActiveWeekLogs";
import { useActiveProgramId, useGetProgramDetail } from "../hooks/usePrograms";
import { useOneRepMax } from "../hooks/useOneRepMax";
import { useEffect, useMemo } from "react";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AddIcon from "@mui/icons-material/Add";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function NoProgramState() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        px: 3,
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "rgba(144, 202, 249, 0.1)",
          mb: 3,
        }}
      >
        <FitnessCenterIcon sx={{ fontSize: 40, color: "primary.main" }} />
      </Box>
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, mb: 1, color: "white" }}
      >
        No Active Program
      </Typography>
      <Typography
        sx={{ color: "text.secondary", mb: 4, maxWidth: 300 }}
      >
        Create a training program to start logging your workouts and tracking progress.
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Button
          component={Link}
          to="/create-program"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            px: 3,
            py: 1.25,
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Create Program
        </Button>
        <Button
          component={Link}
          to="/program"
          variant="outlined"
          sx={{
            px: 3,
            py: 1.25,
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 600,
            borderColor: "rgba(255,255,255,0.2)",
            color: "white",
            "&:hover": {
              borderColor: "rgba(255,255,255,0.4)",
              bgcolor: "rgba(255,255,255,0.05)",
            },
          }}
        >
          View Programs
        </Button>
      </Stack>
    </Box>
  );
}

function DashboardPage() {
  const navigate = useNavigate();
  const { selectedDay, setSelectedDay, handleDayButtonClick } =
    useDaySelector();
  const activeProgramId = useActiveProgramId();
  const query = useGetActiveWeekLogs(activeProgramId);
  const { oneRepMaxQuery } = useOneRepMax();
  const programQuery = useGetProgramDetail(activeProgramId ?? 0);

  // Get unique exercise IDs from the program
  const programExerciseIds = useMemo(() => {
    if (!programQuery.data) return new Set<number>();
    const ids = new Set<number>();
    for (const day of programQuery.data.days) {
      for (const exercise of day.exercises) {
        ids.add(exercise.exercise_id);
      }
    }
    return ids;
  }, [programQuery.data]);

  // Check if any exercises are missing 1RM values
  const needsMaxSetup = useMemo(() => {
    if (!activeProgramId || programExerciseIds.size === 0) return false;
    if (!oneRepMaxQuery.data) return false;

    const existingMaxExerciseNames = new Set(
      oneRepMaxQuery.data.map((m) => m.exercise_name)
    );

    // Check if all program exercises have a corresponding 1RM entry
    if (!programQuery.data) return false;

    for (const day of programQuery.data.days) {
      for (const exercise of day.exercises) {
        if (!existingMaxExerciseNames.has(exercise.exercise_name)) {
          return true;
        }
      }
    }
    return false;
  }, [activeProgramId, programExerciseIds, oneRepMaxQuery.data, programQuery.data]);

  useEffect(() => {
    if (query.data) setSelectedDay(query.data.currentDayOfWeek);
  }, [query.data?.currentDayOfWeek, setSelectedDay]);

  // Redirect to setup if needed
  useEffect(() => {
    if (needsMaxSetup && !oneRepMaxQuery.isLoading && !programQuery.isLoading) {
      navigate({ to: "/setup-maxes" });
    }
  }, [needsMaxSetup, oneRepMaxQuery.isLoading, programQuery.isLoading, navigate]);

  if (activeProgramId === null) {
    return <NoProgramState />;
  }

  // Show loading while checking if setup is needed
  if (oneRepMaxQuery.isLoading || programQuery.isLoading || query.isPending) {
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

  if (query.error) {
    return (
      <Box sx={{ m: 3 }}>
        <Typography color="error">
          An error has occurred: {query.error.message}
        </Typography>
      </Box>
    );
  }

  if (!query.data) return null;

  return (
    <WeeklyView
      weekData={query.data.weekData}
      selectedDay={selectedDay}
      handleDayButtonClick={handleDayButtonClick}
      readOnly={false}
    />
  );
}
