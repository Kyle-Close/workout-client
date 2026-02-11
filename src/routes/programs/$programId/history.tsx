import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Box,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Stack,
} from "@mui/material";
import { useGetActiveWeekNumber } from "../../../hooks/useGetActiveWeekNumber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HistoryIcon from "@mui/icons-material/History";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const Route = createFileRoute(
  "/programs/$programId/history",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { programId } = Route.useParams();
  const { getActiveWeekQuery } = useGetActiveWeekNumber(Number(programId));

  if (getActiveWeekQuery.isError) {
    return (
      <Box sx={{ m: 3 }}>
        <Typography color="error">
          There was an error fetching week data
        </Typography>
      </Box>
    );
  }

  if (getActiveWeekQuery.isLoading) {
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

  const gridItems = () => {
    if (!getActiveWeekQuery.data) return [];
    const result = [];
    for (let i = 0; i < getActiveWeekQuery.data; i++) {
      const isCompleted = i + 1 < getActiveWeekQuery.data;
      const isCurrent = i + 1 === getActiveWeekQuery.data;
      result.push(
        <WeekSquare
          key={i}
          weekNumber={i + 1}
          isCompleted={isCompleted}
          isCurrent={isCurrent}
        />,
      );
    }
    return result;
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 3 }, py: 3 }}>
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 1,
        }}
      >
        <HistoryIcon sx={{ color: "primary.main", fontSize: 28 }} />
        <Typography
          fontWeight={700}
          fontSize={{ xs: "1.4rem", sm: "1.6rem" }}
          color="primary.main"
        >
          Workout History
        </Typography>
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Track your progress through the program
      </Typography>
      <Grid container spacing={1.5}>
        {gridItems()}
      </Grid>
    </Box>
  );
}

interface WeekSquareProps {
  weekNumber: number;
  isCompleted: boolean;
  isCurrent: boolean;
}

function WeekSquare({ weekNumber, isCompleted, isCurrent }: WeekSquareProps) {
  const { programId } = Route.useParams();
  const navigate = useNavigate();

  const handleBtnClick = (isCurrent: boolean, weekNum: number) => {
    if (isCurrent) {
      navigate({ to: "/" });
    } else {
      navigate({
        to: `/programs/${programId}/weeks/${weekNum}/logs`,
      });
    }
  };

  return (
    <Grid size={{ xs: 4, sm: 3 }}>
      <Button
        onClick={() => handleBtnClick(isCurrent, weekNumber)}
        fullWidth
        sx={{
          bgcolor: isCompleted
            ? "rgba(46, 125, 50, 0.15)"
            : isCurrent
              ? "rgba(144, 202, 249, 0.12)"
              : "rgba(255,255,255,0.03)",
          minHeight: { xs: 90, sm: 100 },
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
          p: 1.5,
          position: "relative",
          overflow: "hidden",
          transition: "all 0.2s ease",
          border: 1,
          borderColor: isCurrent
            ? "rgba(144, 202, 249, 0.4)"
            : isCompleted
              ? "rgba(46, 125, 50, 0.3)"
              : "rgba(255,255,255,0.08)",
          "&:hover": {
            bgcolor: isCompleted
              ? "rgba(46, 125, 50, 0.22)"
              : isCurrent
                ? "rgba(144, 202, 249, 0.18)"
                : "rgba(255,255,255,0.06)",
            borderColor: isCurrent
              ? "rgba(144, 202, 249, 0.6)"
              : isCompleted
                ? "rgba(46, 125, 50, 0.5)"
                : "rgba(255,255,255,0.15)",
          },
          "&:active": {
            transform: "scale(0.97)",
          },
        }}
      >
        <Typography
          fontWeight={700}
          fontSize={{ xs: "1.5rem", sm: "1.75rem" }}
          color={
            isCurrent
              ? "primary.main"
              : isCompleted
                ? "success.main"
                : "text.secondary"
          }
          sx={{ lineHeight: 1.2 }}
        >
          {weekNumber}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            opacity: 0.7,
            textTransform: "none",
            fontSize: "0.65rem",
            color: isCurrent
              ? "primary.main"
              : isCompleted
                ? "success.main"
                : "text.secondary",
          }}
        >
          {isCurrent ? "Current" : isCompleted ? "Done" : "Week"}
        </Typography>
        {isCompleted && (
          <CheckCircleIcon
            sx={{
              position: "absolute",
              top: 6,
              right: 6,
              color: "success.main",
              fontSize: 16,
              opacity: 0.7,
            }}
          />
        )}
      </Button>
    </Grid>
  );
}
