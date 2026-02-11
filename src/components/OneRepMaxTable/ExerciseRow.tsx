import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import type { OneRepMax } from "../../schemas/oneRepMaxesSchema";
import { bodyCellSx } from "./styles";
import { getDeltaInfo } from "./utils";
import { ProgressChip } from "./ProgressChip";
import { WeightValue } from "./WeightValue";

interface ExerciseRowProps {
  entry: OneRepMax;
}

export function ExerciseRow({ entry }: ExerciseRowProps) {
  const deltaInfo = getDeltaInfo(entry.original_one_rep_max, entry.current_one_rep_max);

  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        "&:hover": { backgroundColor: "action.hover" },
        transition: "background-color 0.2s ease",
      }}
    >
      <TableCell
        sx={{
          ...bodyCellSx,
          fontWeight: 500,
          color: "text.primary",
          fontSize: { xs: "0.8rem", sm: "0.875rem" },
        }}
      >
        {entry.exercise_name}
      </TableCell>
      <TableCell
        align="right"
        sx={{
          ...bodyCellSx,
          fontWeight: 600,
          fontSize: { xs: "0.85rem", sm: "1rem" },
          color: "primary.main",
          whiteSpace: "nowrap",
        }}
      >
        <WeightValue value={entry.current_one_rep_max} isPrimary />
      </TableCell>
      <TableCell
        align="right"
        sx={{
          ...bodyCellSx,
          color: "text.secondary",
          fontSize: { xs: "0.8rem", sm: "0.875rem" },
          whiteSpace: "nowrap",
        }}
      >
        <WeightValue value={entry.original_one_rep_max} />
      </TableCell>
      <TableCell align="center" sx={bodyCellSx}>
        <ProgressChip deltaInfo={deltaInfo} />
      </TableCell>
    </TableRow>
  );
}
