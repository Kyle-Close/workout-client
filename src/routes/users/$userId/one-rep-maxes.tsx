import { createFileRoute } from "@tanstack/react-router";
import OneRepMaxTable from "../../../components/OneRepMaxTable";
import { Box } from "@mui/material";
import { useOneRepMax } from "../../../hooks/useOneRepMax";

export const Route = createFileRoute("/users/$userId/one-rep-maxes")({
  component: RouteComponent,
});

function RouteComponent() {
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
      <OneRepMaxTable data={oneRepMaxQuery.data} />
    </Box>
  );
}
