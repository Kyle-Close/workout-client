import { useMemo, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import type { OneRepMaxResponse, OneRepMax } from "../../schemas/oneRepMaxesSchema";
import { TableHeader } from "./TableHeader";
import { TableHeaderCells } from "./TableHeaderCells";
import { ExerciseRow } from "./ExerciseRow";
import { EmptyState } from "./EmptyState";
import { getDeltaInfo } from "./utils";

export type SortKey = "exercise_name" | "current_one_rep_max" | "original_one_rep_max" | "progress";
export type SortDirection = "asc" | "desc";

function getProgressValue(entry: OneRepMax): number {
  return getDeltaInfo(entry.original_one_rep_max, entry.current_one_rep_max).numericValue;
}

function comparator(a: OneRepMax, b: OneRepMax, key: SortKey, dir: SortDirection): number {
  let cmp: number;
  if (key === "exercise_name") {
    cmp = a.exercise_name.localeCompare(b.exercise_name);
  } else if (key === "progress") {
    cmp = getProgressValue(a) - getProgressValue(b);
  } else {
    cmp = a[key] - b[key];
  }
  return dir === "asc" ? cmp : -cmp;
}

interface OneRepMaxTableProps {
  data: OneRepMaxResponse;
}

export default function OneRepMaxTable({ data }: OneRepMaxTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("exercise_name");
  const [sortDir, setSortDir] = useState<SortDirection>("asc");

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = useMemo(
    () => [...data].sort((a, b) => comparator(a, b, sortKey, sortDir)),
    [data, sortKey, sortDir],
  );

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box sx={{ backgroundColor: "grey.900" }}>
        <TableHeader />
        <Table aria-label="one rep max table header">
          <TableHeaderCells sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />
        </Table>
      </Box>

      <TableContainer sx={{ overflowX: "auto" }}>
        <Table aria-label="one rep max table body">
          <TableBody>
            {sorted.map((entry, index) => (
              <ExerciseRow key={index} entry={entry} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {data.length === 0 && <EmptyState />}
    </Paper>
  );
}
