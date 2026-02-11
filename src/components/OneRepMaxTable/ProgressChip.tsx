import Chip from "@mui/material/Chip";
import type { DeltaInfo } from "./utils";

interface ProgressChipProps {
  deltaInfo: DeltaInfo;
}

export function ProgressChip({ deltaInfo }: ProgressChipProps) {
  return (
    <Chip
      icon={deltaInfo.icon}
      label={deltaInfo.value}
      color={deltaInfo.color}
      size="small"
      sx={{
        fontWeight: 600,
        minWidth: { xs: 70, sm: 85 },
        fontSize: { xs: "0.7rem", sm: "0.8125rem" },
        "& .MuiChip-icon": { marginLeft: "8px" },
      }}
    />
  );
}
