import { createFileRoute } from "@tanstack/react-router";
import { useOneRepMax } from "../../hooks/useOneRepMax";
import OneRepMaxTable from "../../components/OneRepMaxTable";
import { Box, Typography } from "@mui/material";

export const Route = createFileRoute("/one-rep-max/$userId")({
  component: OneRepMaxPage,
});

function OneRepMaxPage() {
  const { userId } = Route.useParams();
  const { oneRepMaxQuery } = useOneRepMax(userId);

  if (oneRepMaxQuery.isError) {
    return <div>{oneRepMaxQuery.error.message}</div>;
  }

  if (oneRepMaxQuery.isPending || !oneRepMaxQuery.data) {
    return <div>Loading...</div>;
  }

  return (
    <Box p={1}>
      <Typography p={4} variant="h5" color="primary">
        One Rep Maxes
      </Typography>
      <OneRepMaxTable data={oneRepMaxQuery.data} />
    </Box>
  );
}
