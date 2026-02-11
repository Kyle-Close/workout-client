import { Box, Stack, Typography } from "@mui/material";
import NotesIcon from "@mui/icons-material/Notes";

interface CompletedResultsProps {
  setsCompleted: number | null;
  targetSets: number;
  repsInReserve: number | null;
  notes?: string | null;
}

export function CompletedResults({ setsCompleted, targetSets, repsInReserve, notes }: CompletedResultsProps) {
  const setsHit = setsCompleted != null && setsCompleted >= targetSets;
  const rirValid = repsInReserve != null && repsInReserve >= 0;

  return (
    <>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
        <Box
          sx={{
            textAlign: "center",
            py: 1.5,
            px: 1,
            borderRadius: "8px",
            bgcolor: setsHit ? "rgba(46, 125, 50, 0.12)" : "rgba(211, 47, 47, 0.12)",
            border: 1,
            borderColor: setsHit ? "rgba(46, 125, 50, 0.3)" : "rgba(211, 47, 47, 0.3)",
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
          >
            Sets Completed
          </Typography>
          <Typography
            fontWeight={700}
            fontSize="1.25rem"
            color={setsHit ? "success.main" : "error.main"}
          >
            {setsCompleted}
          </Typography>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            py: 1.5,
            px: 1,
            borderRadius: "8px",
            bgcolor: rirValid ? "rgba(46, 125, 50, 0.12)" : "rgba(211, 47, 47, 0.12)",
            border: 1,
            borderColor: rirValid ? "rgba(46, 125, 50, 0.3)" : "rgba(211, 47, 47, 0.3)",
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
          >
            Reps in Reserve
          </Typography>
          <Typography
            fontWeight={700}
            fontSize="1.25rem"
            color={rirValid ? "success.main" : "error.main"}
          >
            {repsInReserve}
          </Typography>
        </Box>
      </Box>

      {notes && (
        <Stack
          direction="row"
          alignItems="flex-start"
          gap={0.75}
          sx={{
            mt: 1.5,
            px: 1.5,
            py: 1,
            borderRadius: "8px",
            bgcolor: "rgba(255,255,255,0.03)",
            border: 1,
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >
          <NotesIcon sx={{ fontSize: 14, color: "text.secondary", mt: 0.25 }} />
          <Typography fontSize="0.8rem" color="text.secondary" sx={{ fontStyle: "italic" }}>
            {notes}
          </Typography>
        </Stack>
      )}
    </>
  );
}
