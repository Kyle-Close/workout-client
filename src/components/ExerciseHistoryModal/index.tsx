import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useExerciseHistory } from "../../hooks/useExerciseHistory";
import { useHistoryStats } from "./useHistoryStats";
import { LoadingState, ErrorState, EmptyState } from "./StateComponents";
import { HistoryStatsRow } from "./HistoryStatsRow";
import { HistoryChart } from "./HistoryChart";
import { SessionCount } from "./SessionCount";

interface ExerciseHistoryModalProps {
  open: boolean;
  onClose: () => void;
  exerciseId: number | null;
  exerciseName: string;
}

export function ExerciseHistoryModal({
  open,
  onClose,
  exerciseId,
  exerciseName,
}: ExerciseHistoryModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data, isLoading, isError } = useExerciseHistory(exerciseId);

  const history = data?.history ?? [];
  const stats = useHistoryStats(history);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "background.default",
          backgroundImage: "none",
          borderRadius: isMobile ? 0 : "16px",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 1,
        }}
      >
        <Box>
          <Typography fontWeight={600} fontSize="1.1rem">
            {exerciseName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Weight Progression
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: { xs: 2, sm: 3 }, pb: 3 }}>
        {isLoading && <LoadingState />}
        {isError && <ErrorState />}
        {!isLoading && !isError && !stats && <EmptyState />}

        {!isLoading && !isError && stats && (
          <>
            <HistoryStatsRow stats={stats} />
            <HistoryChart history={history} avgWeight={stats.avgWeight} />
            <SessionCount count={history.length} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
