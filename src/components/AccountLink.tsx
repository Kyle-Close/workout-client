import { Typography, Box } from "@mui/material";
import { Link } from "@tanstack/react-router";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import type { ReactElement } from "react";

interface AccountLinkProps {
  url: string;
  title: string;
  description?: string;
  icon?: ReactElement;
  params?: {};
}

export function AccountLink({
  url,
  title,
  description,
  icon,
  params,
}: AccountLinkProps) {
  return (
    <Link to={url} params={params} style={{ textDecoration: "none" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: 2,
          borderRadius: "12px",
          bgcolor: "rgba(255,255,255,0.03)",
          border: 1,
          borderColor: "rgba(255,255,255,0.08)",
          transition: "all 0.2s ease",
          "&:hover": {
            bgcolor: "rgba(255,255,255,0.06)",
            borderColor: "rgba(255,255,255,0.15)",
          },
          "&:active": {
            bgcolor: "rgba(255,255,255,0.08)",
          },
        }}
      >
        {icon && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: "10px",
              bgcolor: "rgba(144, 202, 249, 0.12)",
              color: "primary.main",
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
        )}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            fontWeight={500}
            fontSize="0.95rem"
            color="text.primary"
          >
            {title}
          </Typography>
          {description && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ lineHeight: 1.3 }}
            >
              {description}
            </Typography>
          )}
        </Box>
        <ChevronRightIcon sx={{ color: "text.secondary", flexShrink: 0 }} />
      </Box>
    </Link>
  );
}
