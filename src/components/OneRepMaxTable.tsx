import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import type {
  OneRepMax,
  OneRepMaxResponse,
} from "../schemas/oneRepMaxesSchema";

const createTableRow = (key: number, rowData: OneRepMax, delta: string) => {
  return (
    <TableRow key={key}>
      <TableCell>{rowData.exercise_name}</TableCell>
      <TableCell>{rowData.current_one_rep_max}</TableCell>
      <TableCell>{rowData.original_one_rep_max}</TableCell>
      <TableCell>{delta}</TableCell>
    </TableRow>
  );
};

interface OneRepMaxTableProps {
  data: OneRepMaxResponse;
}

export default function OneRepMaxTable({ data }: OneRepMaxTableProps) {
  const calculateDelta = (original: number, current: number): string => {
    if (original === 0) return "N/A";
    const percentChange = ((current - original) / original) * 100;
    const sign = percentChange > 0 ? "+" : "";
    return `${sign}${percentChange.toFixed(1)}%`;
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Exercise</TableCell>
            <TableCell>Current Max</TableCell>
            <TableCell>Original Max</TableCell>
            <TableCell>Delta (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((rowData, key) =>
            createTableRow(
              key,
              rowData,
              calculateDelta(
                rowData.original_one_rep_max,
                rowData.current_one_rep_max,
              ),
            ),
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
