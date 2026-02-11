import { Avatar, Box, Stack, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { AccountLink } from "../components/AccountLink";
import { useActiveProgramId } from "../hooks/usePrograms";
import { useAuth } from "../auth";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HistoryIcon from "@mui/icons-material/History";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import PersonIcon from "@mui/icons-material/Person";
import TodayIcon from "@mui/icons-material/Today";

export const Route = createFileRoute("/account")({
  component: RouteComponent,
});

function RouteComponent() {
  const activeProgramId = useActiveProgramId();
  const { user } = useAuth();

  return (
    <Box sx={{ px: { xs: 2, sm: 3 }, py: 3 }}>
      {/* Profile header */}
      <Stack
        alignItems="center"
        spacing={1.5}
        sx={{
          mb: 4,
          py: 3,
          borderRadius: "16px",
          bgcolor: "rgba(255,255,255,0.03)",
          border: 1,
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        <Avatar
          sx={{
            width: 64,
            height: 64,
            bgcolor: "rgba(144, 202, 249, 0.15)",
            color: "primary.main",
          }}
        >
          <PersonIcon sx={{ fontSize: 32 }} />
        </Avatar>
        <Typography fontWeight={600} fontSize="1.2rem">
          {user?.username ?? "User"}
        </Typography>
      </Stack>

      {/* Navigation links */}
      <Stack gap={1.5}>
        <AccountLink
          url="/dashboard"
          title="Today's Workout"
          description="Log your current workout"
          icon={<TodayIcon fontSize="small" />}
        />
        <AccountLink
          url="/program"
          title="Programs"
          description="View and manage your training programs"
          icon={<FitnessCenterIcon fontSize="small" />}
        />
        <AccountLink
          url="/one-rep-maxes"
          title="One Rep Maxes"
          description="Track your strength progress"
          icon={<EmojiEventsIcon fontSize="small" />}
        />
        <AccountLink
          url="/weight"
          title="Body Weight"
          description="Track your body weight"
          icon={<MonitorWeightIcon fontSize="small" />}
        />
        {activeProgramId !== null && (
          <AccountLink
            url="/programs/$programId/history"
            title="Workout History"
            description="Review past workouts"
            icon={<HistoryIcon fontSize="small" />}
            params={{ programId: activeProgramId }}
          />
        )}
      </Stack>
    </Box>
  );
}
