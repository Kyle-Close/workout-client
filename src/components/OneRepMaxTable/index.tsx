import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import type { OneRepMaxResponse } from "../../schemas/oneRepMaxesSchema";
import { TableHeader } from "./TableHeader";
import { TableHeaderCells } from "./TableHeaderCells";
import { ExerciseRow } from "./ExerciseRow";
import { EmptyState } from "./EmptyState";

interface OneRepMaxTableProps {
  data: OneRepMaxResponse;
}

export default function OneRepMaxTable({ data }: OneRepMaxTableProps) {
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
          <TableHeaderCells />
        </Table>
      </Box>

      <TableContainer sx={{ overflowX: "auto" }}>
        <Table aria-label="one rep max table body">
          <TableBody>
            {data.map((entry, index) => (
              <ExerciseRow key={index} entry={entry} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {data.length === 0 && <EmptyState />}
    </Paper>
  );
}
