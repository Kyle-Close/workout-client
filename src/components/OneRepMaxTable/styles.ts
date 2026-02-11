import type { SxProps, Theme } from "@mui/material";

export const headerCellSx: SxProps<Theme> = {
  fontWeight: 600,
  color: "grey.400",
  textTransform: "uppercase",
  fontSize: { xs: "0.65rem", sm: "0.75rem" },
  letterSpacing: 0.5,
  py: 1.5,
  px: { xs: 1, sm: 2 },
  whiteSpace: "nowrap",
  borderBottom: "none",
  backgroundColor: "grey.900",
};

export const bodyCellSx: SxProps<Theme> = {
  py: { xs: 1.5, sm: 2 },
  px: { xs: 1, sm: 2 },
};
