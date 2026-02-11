import Typography from "@mui/material/Typography";

interface WeightValueProps {
  value: number;
  isPrimary?: boolean;
}

export function WeightValue({ value, isPrimary = false }: WeightValueProps) {
  return (
    <>
      {value}
      <Typography
        component="span"
        sx={{
          ml: 0.5,
          fontSize: isPrimary ? { xs: "0.65rem", sm: "0.75rem" } : { xs: "0.6rem", sm: "0.75rem" },
          color: isPrimary ? "text.secondary" : "text.disabled",
          fontWeight: isPrimary ? 400 : undefined,
        }}
      >
        lbs
      </Typography>
    </>
  );
}
