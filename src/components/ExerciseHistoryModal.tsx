import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import { useExerciseHistory } from "../hooks/useExerciseHistory";
import { USER_ID } from "../globals";
import type { ExerciseHistoryEntry } from "../schemas/exerciseHistorySchema";

interface ExerciseHistoryModalProps {
  open: boolean;
  onClose: () => void;
  exerciseId: number | null;
  exerciseName: string;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: ExerciseHistoryEntry }>;
}) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  const date = new Date(data.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const hitTarget =
    data.sets_completed !== null &&
    data.sets_completed >= data.target_sets;

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: 1,
        borderColor: "rgba(255,255,255,0.15)",
        borderRadius: "8px",
        p: 1.5,
        boxShadow: 3,
      }}
    >
      <Typography fontSize="0.8rem" color="text.secondary" sx={{ mb: 0.5 }}>
        {formattedDate}
      </Typography>
      <Typography fontSize="1.1rem" fontWeight={600} color="primary.main">
        {data.weight} lbs
      </Typography>
      <Stack direction="row" gap={2} mt={0.75}>
        <Typography
          variant="caption"
          color={hitTarget ? "success.main" : "error.main"}
        >
          Sets: {data.sets_completed ?? "—"}/{data.target_sets}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          RIR: {data.reps_in_reserve ?? "—"}
        </Typography>
      </Stack>
    </Box>
  );
}

export function ExerciseHistoryModal({
  open,
  onClose,
  exerciseId,
  exerciseName,
}: ExerciseHistoryModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data, isLoading, isError } = useExerciseHistory(USER_ID, exerciseId);

  const history = data?.history ?? [];
  const hasData = history.length > 0;

  // Calculate stats
  const weights = history.map((h) => h.weight);
  const minWeight = hasData ? Math.min(...weights) : 0;
  const maxWeight = hasData ? Math.max(...weights) : 0;
  const avgWeight = hasData
    ? Math.round(weights.reduce((a, b) => a + b, 0) / weights.length)
    : 0;

  // Trend calculation
  let trend: "up" | "down" | "flat" = "flat";
  let trendAmount = 0;
  if (history.length >= 2) {
    const firstWeight = history[0].weight;
    const lastWeight = history[history.length - 1].weight;
    trendAmount = lastWeight - firstWeight;
    if (trendAmount > 0) trend = "up";
    else if (trendAmount < 0) trend = "down";
  }

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
        {isLoading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 200,
            }}
          >
            <CircularProgress size={32} />
          </Box>
        )}

        {isError && (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography color="error">Failed to load history</Typography>
          </Box>
        )}

        {!isLoading && !isError && !hasData && (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography color="text.secondary">
              No history available yet
            </Typography>
          </Box>
        )}

        {!isLoading && !isError && hasData && (
          <>
            {/* Stats row */}
            <Stack
              direction="row"
              spacing={1}
              sx={{
                mb: 3,
                p: 1.5,
                borderRadius: "10px",
                bgcolor: "rgba(255,255,255,0.03)",
              }}
            >
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
                >
                  Current
                </Typography>
                <Typography fontWeight={600} fontSize="1.1rem" color="primary.main">
                  {history[history.length - 1].weight}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "1px",
                  bgcolor: "rgba(255,255,255,0.1)",
                  alignSelf: "stretch",
                }}
              />
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
                >
                  Trend
                </Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  gap={0.5}
                >
                  {trend === "up" && (
                    <TrendingUpIcon
                      sx={{ fontSize: 18, color: "success.main" }}
                    />
                  )}
                  {trend === "down" && (
                    <TrendingDownIcon
                      sx={{ fontSize: 18, color: "error.main" }}
                    />
                  )}
                  {trend === "flat" && (
                    <TrendingFlatIcon
                      sx={{ fontSize: 18, color: "text.secondary" }}
                    />
                  )}
                  <Typography
                    fontWeight={600}
                    fontSize="1.1rem"
                    color={
                      trend === "up"
                        ? "success.main"
                        : trend === "down"
                          ? "error.main"
                          : "text.secondary"
                    }
                  >
                    {trendAmount > 0 ? "+" : ""}
                    {trendAmount}
                  </Typography>
                </Stack>
              </Box>
              <Box
                sx={{
                  width: "1px",
                  bgcolor: "rgba(255,255,255,0.1)",
                  alignSelf: "stretch",
                }}
              />
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
                >
                  Range
                </Typography>
                <Typography fontWeight={600} fontSize="1.1rem">
                  {minWeight}-{maxWeight}
                </Typography>
              </Box>
            </Stack>

            {/* Chart */}
            <Box sx={{ width: "100%", height: 250 }}>
              <ResponsiveContainer>
                <LineChart
                  data={history}
                  margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.06)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDate}
                    tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
                    axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                    tickLine={false}
                    dy={8}
                  />
                  <YAxis
                    domain={[
                      (dataMin: number) => Math.floor(dataMin * 0.95),
                      (dataMax: number) => Math.ceil(dataMax * 1.05),
                    ]}
                    tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine
                    y={avgWeight}
                    stroke="rgba(144, 202, 249, 0.3)"
                    strokeDasharray="5 5"
                  />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="#90caf9"
                    strokeWidth={2}
                    dot={{
                      fill: "#90caf9",
                      strokeWidth: 0,
                      r: 4,
                    }}
                    activeDot={{
                      fill: "#90caf9",
                      strokeWidth: 2,
                      stroke: "#fff",
                      r: 6,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>

            {/* Sessions count */}
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", textAlign: "center", mt: 2 }}
            >
              {history.length} session{history.length !== 1 ? "s" : ""} recorded
            </Typography>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
