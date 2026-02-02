import { Typography, Stack, Divider } from "@mui/material";
import { Link } from "@tanstack/react-router";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

interface AccountLinkProps {
  url: string;
  title: string;
  params?: {};
}

export function AccountLink({ url, title, params }: AccountLinkProps) {
  return (
    <Stack gap={2}>
      <Link to={url} params={params}>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontSize="large">{title}</Typography>
          <ArrowOutwardIcon />
        </Stack>
      </Link>
      <Divider />
    </Stack>
  );
}
