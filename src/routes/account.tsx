import { Box, Stack, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { AccountLink } from "../components/AccountLink";

export const Route = createFileRoute("/account")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Box p={4}>
      <Typography color="primary" mb={4} variant="h5">
        Kyle Close
      </Typography>
      <Stack gap={2}>
        <AccountLink url="/program" title="Program" />
        <AccountLink url="/onerepmaxes" title="One Rep Maxes" />
        <AccountLink url="/history" title="Workout History" />
      </Stack>
    </Box>
  );
}
