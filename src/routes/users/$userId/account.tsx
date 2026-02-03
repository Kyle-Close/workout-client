import { Box, Stack, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { AccountLink } from "../../../components/AccountLink";
import { PROGRAM_ID, USER_ID } from "../../../globals";

export const Route = createFileRoute("/users/$userId/account")({
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
        <AccountLink
          url="/users/$userId/one-rep-maxes"
          title="One Rep Maxes"
          params={{ userId: USER_ID }}
        />
        <AccountLink
          url="/users/$userId/programs/$programId/history"
          title="Workout History"
          params={{ userId: USER_ID, programId: PROGRAM_ID }}
        />
      </Stack>
    </Box>
  );
}
