import type { ExerciseForDayView } from "../schemas/currentWeekSchema";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { Box, Stack } from "@mui/material";
import NumberSpinner from "./NumberSpinner";

interface ExerciseAccordianProps {
  exercise: ExerciseForDayView;
}
export function ExerciseAccordian({ exercise }: ExerciseAccordianProps) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" component="span">
          {exercise.exercise_name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2} ml={2} mr={2}>
          <Stack direction='row' justifyContent='space-around'>
            <Stack direction='row' spacing={1} >
              <Typography fontWeight='medium' color="primary">Weight:</Typography>
              <Typography>{exercise.weight}</Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
              <Typography fontWeight='medium' color="secondary">Sets:</Typography>
              <Typography>{exercise.target_sets}</Typography>
            </Stack>
            <Stack direction='row' spacing={1}>
              <Typography fontWeight='medium' color="secondary">Reps:</Typography>
              <Typography>{exercise.target_reps}</Typography>
            </Stack>
          </Stack>
          <Stack direction='row' justifyContent='space-between'>
            <Box>
              <NumberSpinner size="small" label="Sets Completed" min={0} />
            </Box>
            <Box>
              <NumberSpinner size="small" label="Sets Completed" min={0} />
            </Box>
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
