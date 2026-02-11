import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { headerCellSx } from "./styles";

export function TableHeaderCells() {
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={headerCellSx}>Exercise</TableCell>
        <TableCell align="right" sx={headerCellSx}>
          Current
        </TableCell>
        <TableCell align="right" sx={headerCellSx}>
          Original
        </TableCell>
        <TableCell align="center" sx={headerCellSx}>
          Progress
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
