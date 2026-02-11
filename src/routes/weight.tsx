import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import {
  useGetUserWeight,
  useCreateUserWeight,
  useDeleteUserWeight,
} from "../hooks/useUserWeight";
import type { UserWeightEntry } from "../schemas/userWeightSchema";

export const Route = createFileRoute("/weight")({
  component: RouteComponent,
});

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getTodayString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function CurrentWeightCard({ entries }: { entries: UserWeightEntry[] }) {
  const latest = entries[0];

  return (
    <Box
      sx={{
        borderRadius: "16px",
        bgcolor: "rgba(144, 202, 249, 0.08)",
        border: 1,
        borderColor: "rgba(144, 202, 249, 0.2)",
        p: 3,
        textAlign: "center",
        mb: 3,
      }}
    >
      {latest ? (
        <>
          <Typography color="text.secondary" fontSize="0.8rem" sx={{ mb: 1 }}>
            Current Weight
          </Typography>
          <Stack
            direction="row"
            alignItems="baseline"
            justifyContent="center"
            spacing={1}
          >
            <Typography
              fontWeight={700}
              fontSize="2.5rem"
              color="primary.main"
              sx={{ lineHeight: 1.2 }}
            >
              {latest.weight}
            </Typography>
            <Typography
              color="text.secondary"
              fontWeight={500}
              fontSize="1.1rem"
            >
              lbs
            </Typography>
          </Stack>
          <Typography color="text.secondary" fontSize="0.85rem" sx={{ mt: 1 }}>
            {formatDate(latest.date)}
          </Typography>
        </>
      ) : (
        <Typography color="text.secondary" fontSize="0.95rem">
          No weight logged yet
        </Typography>
      )}
    </Box>
  );
}

function LogWeightForm() {
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState(getTodayString());
  const createWeight = useCreateUserWeight();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(weight);
    if (isNaN(parsed) || parsed <= 0) return;

    try {
      await createWeight.mutateAsync({
        weight: parsed,
        date,
      });
      setWeight("");
      setDate(getTodayString());
    } catch {
      // error handled via mutation state
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Stack
        component="form"
        onSubmit={handleSubmit}
        direction="row"
        spacing={1.5}
        alignItems="flex-start"
      >
        <TextField
          label="Weight (lbs)"
          type="number"
          size="small"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          inputProps={{ step: "0.1", min: "0" }}
          sx={{ flex: 1 }}
          required
        />
        <TextField
          label="Date"
          type="date"
          size="small"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          required
        />
        <Button
          type="submit"
          variant="contained"
          disabled={createWeight.isPending || !weight}
          sx={{
            height: 40,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Log
        </Button>
      </Stack>
      {createWeight.isError && (
        <Alert severity="error" sx={{ mt: 1.5 }}>
          {createWeight.error.message}
        </Alert>
      )}
    </Box>
  );
}

function WeightHistory({ entries }: { entries: UserWeightEntry[] }) {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const deleteWeight = useDeleteUserWeight();

  const handleDelete = async (id: number) => {
    if (deletingId === id) {
      try {
        await deleteWeight.mutateAsync(id);
      } catch {
        // error silently handled
      }
      setDeletingId(null);
    } else {
      setDeletingId(id);
    }
  };

  if (entries.length === 0) return null;

  return (
    <Box>
      <Typography fontWeight={500} fontSize="1rem" sx={{ mb: 1.5 }}>
        History
      </Typography>
      {entries.map((entry, index) => {
        const prevEntry = entries[index + 1];
        const weightChange = prevEntry
          ? +(entry.weight - prevEntry.weight).toFixed(1)
          : null;

        return (
          <Stack
            key={entry.id}
            direction="row"
            alignItems="center"
            sx={{
              py: 1.5,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <Typography
              color="text.secondary"
              fontSize="0.85rem"
              sx={{ minWidth: 120 }}
            >
              {formatDate(entry.date)}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ flex: 1 }}>
              <Typography fontWeight={600} fontSize="0.95rem">
                {entry.weight}
              </Typography>
              <Typography color="text.secondary" fontSize="0.8rem">
                lbs
              </Typography>
            </Stack>

            {weightChange != null && weightChange !== 0 && (
              <Stack
                direction="row"
                alignItems="center"
                spacing={0.25}
                sx={{
                  px: 0.75,
                  py: 0.25,
                  borderRadius: "6px",
                  mr: 1,
                  bgcolor:
                    weightChange > 0
                      ? "rgba(46, 125, 50, 0.15)"
                      : "rgba(211, 47, 47, 0.15)",
                }}
              >
                {weightChange > 0 ? (
                  <TrendingUpIcon
                    sx={{ fontSize: 14, color: "success.main" }}
                  />
                ) : (
                  <TrendingDownIcon
                    sx={{ fontSize: 14, color: "error.main" }}
                  />
                )}
                <Typography
                  sx={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    color:
                      weightChange > 0 ? "success.main" : "error.main",
                  }}
                >
                  {Math.abs(weightChange)}
                </Typography>
              </Stack>
            )}

            <IconButton
              size="small"
              onClick={() => handleDelete(entry.id)}
              sx={{
                color:
                  deletingId === entry.id ? "error.main" : "text.secondary",
              }}
            >
              <DeleteOutlineIcon sx={{ fontSize: 18 }} />
            </IconButton>
            {deletingId === entry.id && (
              <Typography
                fontSize="0.7rem"
                color="error.main"
                sx={{ ml: 0.5 }}
              >
                confirm?
              </Typography>
            )}
          </Stack>
        );
      })}
    </Box>
  );
}

function EmptyState() {
  return (
    <Stack alignItems="center" spacing={1.5} sx={{ py: 4 }}>
      <MonitorWeightIcon
        sx={{ fontSize: 48, color: "text.secondary", opacity: 0.5 }}
      />
      <Typography color="text.secondary" fontSize="0.95rem">
        Log your first weight entry
      </Typography>
    </Stack>
  );
}

function RouteComponent() {
  const navigate = useNavigate();
  const { data: entries, isLoading, isError, error } = useGetUserWeight();

  if (isError) {
    return (
      <Box sx={{ m: 3 }}>
        <Typography color="error">{error.message}</Typography>
      </Box>
    );
  }

  if (isLoading || !entries) {
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

      <Typography fontWeight={600} fontSize="1.25rem" sx={{ mb: 1.5 }}>
        Body Weight
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{
          mb: 3,
          px: 1.5,
          py: 1,
          borderRadius: "8px",
          bgcolor: "rgba(144, 202, 249, 0.06)",
          border: 1,
          borderColor: "rgba(144, 202, 249, 0.12)",
        }}
      >
        <InfoOutlinedIcon sx={{ fontSize: 16, color: "primary.main" }} />
        <Typography color="text.secondary" fontSize="0.8rem">
          Your body weight is used to calculate how much weight to lift on
          assisted exercises.
        </Typography>
      </Stack>

      <CurrentWeightCard entries={entries} />
      <LogWeightForm />

      {entries.length > 0 ? (
        <WeightHistory entries={entries} />
      ) : (
        <EmptyState />
      )}
    </Box>
  );
}
