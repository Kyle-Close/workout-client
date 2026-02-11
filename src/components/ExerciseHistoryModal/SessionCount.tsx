import { Typography } from "@mui/material";

interface SessionCountProps {
  count: number;
}

export function SessionCount({ count }: SessionCountProps) {
  return (
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{ display: "block", textAlign: "center", mt: 2 }}
    >
      {count} session{count !== 1 ? "s" : ""} recorded
    </Typography>
  );
}
