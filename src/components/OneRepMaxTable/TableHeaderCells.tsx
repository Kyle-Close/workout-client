import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { headerCellSx } from "./styles";
import type { SortKey, SortDirection } from "./index";

interface TableHeaderCellsProps {
  sortKey: SortKey;
  sortDir: SortDirection;
  onSort: (key: SortKey) => void;
}

const columns: { key: SortKey; label: string; align: "left" | "right" | "center" }[] = [
  { key: "exercise_name", label: "Exercise", align: "left" },
  { key: "current_one_rep_max", label: "Current", align: "right" },
  { key: "original_one_rep_max", label: "Original", align: "right" },
  { key: "progress", label: "Progress", align: "center" },
];

export function TableHeaderCells({ sortKey, sortDir, onSort }: TableHeaderCellsProps) {
  return (
    <TableHead>
      <TableRow>
        {columns.map((col) => (
          <TableCell key={col.key} align={col.align} sx={headerCellSx}>
            <TableSortLabel
              active={sortKey === col.key}
              direction={sortKey === col.key ? sortDir : "asc"}
              onClick={() => onSort(col.key)}
              sx={{
                "&.MuiTableSortLabel-root": { color: "grey.400" },
                "&.MuiTableSortLabel-root:hover": { color: "grey.200" },
                "&.Mui-active": { color: "grey.200" },
                "& .MuiTableSortLabel-icon": { color: "grey.400 !important" },
                flexDirection: col.align === "right" ? "row-reverse" : "row",
              }}
            >
              {col.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
