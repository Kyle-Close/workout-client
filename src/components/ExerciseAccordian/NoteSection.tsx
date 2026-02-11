import { Box, Button, Collapse, TextField } from "@mui/material";
import NotesIcon from "@mui/icons-material/Notes";

interface NoteSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  value: string;
  onChange: (value: string) => void;
}

export function NoteSection({ isOpen, onToggle, value, onChange }: NoteSectionProps) {
  return (
    <Box>
      <Button
        size="small"
        startIcon={<NotesIcon sx={{ fontSize: 16 }} />}
        onClick={onToggle}
        sx={{
          textTransform: "none",
          color: value ? "primary.main" : "text.secondary",
          fontSize: "0.75rem",
          px: 1,
          py: 0.25,
          minHeight: 0,
        }}
      >
        {isOpen ? "Hide note" : value ? "Edit note" : "Add note"}
      </Button>
      <Collapse in={isOpen}>
        <TextField
          size="small"
          fullWidth
          multiline
          maxRows={3}
          placeholder="e.g. felt easy, grip slipping, left shoulder tight..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          sx={{
            mt: 0.5,
            "& .MuiOutlinedInput-root": { fontSize: "0.8rem" },
          }}
        />
      </Collapse>
    </Box>
  );
}
