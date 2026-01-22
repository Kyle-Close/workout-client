import { Typography, Stack, Divider } from "@mui/material";
import { Link } from "@tanstack/react-router";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

interface AccountLinkProps {
  url: string;
  title: string;
}

export function AccountLink({ url, title }: AccountLinkProps) {
  return (
    <Stack gap={2}>
      <Link to={url}>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontSize="large">{title}</Typography>
          <ArrowOutwardIcon />
        </Stack>
      </Link>
      <Divider />
    </Stack>
  );
}
