import { createFileRoute } from "@tanstack/react-router";
import OneRepMaxTable from "../../../components/OneRepMaxTable";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useOneRepMax } from "../../../hooks/useOneRepMax";

export const Route = createFileRoute("/users/$userId/one-rep-maxes")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userId } = Route.useParams();
  const { oneRepMaxQuery } = useOneRepMax(userId);

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
      <OneRepMaxTable data={oneRepMaxQuery.data} />
    </Box>
  );
}
