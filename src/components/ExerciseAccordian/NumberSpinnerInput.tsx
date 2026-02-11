import { Box, IconButton, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface NumberSpinnerInputProps {
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function NumberSpinnerInput({ label, value, onIncrement, onDecrement }: NumberSpinnerInputProps) {
  return (
    <Box
      sx={{
        p: 1.5,
        borderRadius: "10px",
        bgcolor: "rgba(144, 202, 249, 0.06)",
        border: 1,
        borderColor: "rgba(144, 202, 249, 0.12)",
      }}
    >
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          textTransform: "uppercase",
          letterSpacing: 0.5,
          display: "block",
          textAlign: "center",
          mb: 1,
          fontSize: "0.65rem",
        }}
      >
        {label}
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={1.5}>
        <IconButton
          size="small"
          onClick={onDecrement}
          sx={{
            width: 36,
            height: 36,
            bgcolor: "rgba(255,255,255,0.06)",
            "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
          }}
        >
          <RemoveIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <Typography fontWeight={700} fontSize="1.5rem" sx={{ minWidth: 32, textAlign: "center" }}>
          {value}
        </Typography>
        <IconButton
          size="small"
          onClick={onIncrement}
          sx={{
            width: 36,
            height: 36,
            bgcolor: "rgba(255,255,255,0.06)",
            "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
          }}
        >
          <AddIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Stack>
    </Box>
  );
}
