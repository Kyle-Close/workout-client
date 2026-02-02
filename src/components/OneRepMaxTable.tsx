import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import type { OneRepMaxResponse } from "../schemas/oneRepMaxesSchema";

interface DeltaInfo {
  value: string;
  numericValue: number;
  color: "success" | "error" | "default";
  icon: React.ReactElement;
}

const getDeltaInfo = (original: number, current: number): DeltaInfo => {
  if (original === 0) {
    return {
      value: "N/A",
      numericValue: 0,
      color: "default",
      icon: <TrendingFlatIcon fontSize="small" />,
    };
  }

  const percentChange = ((current - original) / original) * 100;
  const sign = percentChange > 0 ? "+" : "";

  if (percentChange > 0) {
    return {
      value: `${sign}${percentChange.toFixed(1)}%`,
      numericValue: percentChange,
      color: "success",
      icon: <TrendingUpIcon fontSize="small" />,
    };
  } else if (percentChange < 0) {
    return {
      value: `${percentChange.toFixed(1)}%`,
      numericValue: percentChange,
      color: "error",
      icon: <TrendingDownIcon fontSize="small" />,
    };
  }

  return {
    value: "0%",
    numericValue: 0,
    color: "default",
    icon: <TrendingFlatIcon fontSize="small" />,
  };
};

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
      <Box
        sx={{
          backgroundColor: "grey.900",
        }}
      >
        <Box
          sx={{
            px: { xs: 2, sm: 3 },
            py: { xs: 2, sm: 2.5 },
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            borderBottom: "1px solid",
            borderColor: "grey.800",
          }}
        >
          <FitnessCenterIcon
            sx={{ color: "grey.300", fontSize: { xs: 24, sm: 28 } }}
          />
          <Typography
            variant="h6"
            sx={{
              color: "white",
              fontWeight: 600,
              letterSpacing: 0.5,
              fontSize: { xs: "1rem", sm: "1.25rem" },
            }}
          >
            One Rep Max Progress
          </Typography>
        </Box>

        <Table aria-label="one rep max table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
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
                }}
              >
                Exercise
              </TableCell>
              <TableCell
                align="right"
                sx={{
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
                }}
              >
                Current
              </TableCell>
              <TableCell
                align="right"
                sx={{
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
                }}
              >
                Original
              </TableCell>
              <TableCell
                align="center"
                sx={{
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
                }}
              >
                Progress
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </Box>
      <TableContainer sx={{ overflowX: "auto" }}>
        <Table aria-label="one rep max table">
          <TableBody>
            {data.map((rowData, index) => {
              const deltaInfo = getDeltaInfo(
                rowData.original_one_rep_max,
                rowData.current_one_rep_max,
              );

              return (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                    transition: "background-color 0.2s ease",
                  }}
                >
                  <TableCell
                    sx={{
                      py: { xs: 1.5, sm: 2 },
                      px: { xs: 1, sm: 2 },
                      fontWeight: 500,
                      color: "text.primary",
                      fontSize: { xs: "0.8rem", sm: "0.875rem" },
                    }}
                  >
                    {rowData.exercise_name}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      py: { xs: 1.5, sm: 2 },
                      px: { xs: 1, sm: 2 },
                      fontWeight: 600,
                      fontSize: { xs: "0.85rem", sm: "1rem" },
                      color: "primary.main",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {rowData.current_one_rep_max}
                    <Typography
                      component="span"
                      sx={{
                        ml: 0.5,
                        fontSize: { xs: "0.65rem", sm: "0.75rem" },
                        color: "text.secondary",
                        fontWeight: 400,
                      }}
                    >
                      lbs
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      py: { xs: 1.5, sm: 2 },
                      px: { xs: 1, sm: 2 },
                      color: "text.secondary",
                      fontSize: { xs: "0.8rem", sm: "0.875rem" },
                      whiteSpace: "nowrap",
                    }}
                  >
                    {rowData.original_one_rep_max}
                    <Typography
                      component="span"
                      sx={{
                        ml: 0.5,
                        fontSize: { xs: "0.6rem", sm: "0.75rem" },
                        color: "text.disabled",
                      }}
                    >
                      lbs
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ py: { xs: 1.5, sm: 2 }, px: { xs: 1, sm: 2 } }}
                  >
                    <Chip
                      icon={deltaInfo.icon}
                      label={deltaInfo.value}
                      color={deltaInfo.color}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        minWidth: { xs: 70, sm: 85 },
                        fontSize: { xs: "0.7rem", sm: "0.8125rem" },
                        "& .MuiChip-icon": {
                          marginLeft: "8px",
                        },
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {data.length === 0 && (
        <Box
          sx={{
            py: 6,
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          <FitnessCenterIcon sx={{ fontSize: 48, opacity: 0.3, mb: 1 }} />
          <Typography>No exercises recorded yet</Typography>
        </Box>
      )}
    </Paper>
  );
}
