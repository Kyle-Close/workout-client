import { createFileRoute, useNavigate } from "@tanstack/react-router";
import OneRepMaxTable from "../components/OneRepMaxTable";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useOneRepMax } from "../hooks/useOneRepMax";

export const Route = createFileRoute("/one-rep-maxes")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { oneRepMaxQuery } = useOneRepMax();

  if (oneRepMaxQuery.isError) {
    return (
      <Box sx={{ m: 3 }}>
        <Typography color="error">{oneRepMaxQuery.error.message}</Typography>
      </Box>
    );
  }

  if (oneRepMaxQuery.isPending || !oneRepMaxQuery.data) {
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
      <OneRepMaxTable data={oneRepMaxQuery.data} />
    </Box>
  );
}
