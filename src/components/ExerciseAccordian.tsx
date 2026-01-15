import type { ExerciseForDayView } from "../schemas/currentWeekSchema";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ExerciseAccordianProps {
  exercise: ExerciseForDayView;
}
export function ExerciseAccordian({ exercise }: ExerciseAccordianProps) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography component="span">{exercise.exercise_name}</Typography>
      </AccordionSummary>
      <AccordionDetails>{exercise.weight}</AccordionDetails>
    </Accordion>
  );
}
