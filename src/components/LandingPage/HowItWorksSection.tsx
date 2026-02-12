import { Box, Stack, Typography } from "@mui/material";

interface StepProps {
  number: string;
  title: string;
  description: string;
  isLast?: boolean;
}

function Step({ number, title, description, isLast = false }: StepProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "center", sm: "flex-start" },
        textAlign: { xs: "center", sm: "left" },
        position: "relative",
        flex: 1,
      }}
    >
      {/* Connector line */}
      {!isLast && (
        <Box
          sx={{
            display: { xs: "none", sm: "block" },
            position: "absolute",
            top: 28,
            left: 56,
            right: 0,
            height: 2,
            background:
              "linear-gradient(90deg, rgba(144,202,249,0.5) 0%, rgba(144,202,249,0.1) 100%)",
          }}
        />
      )}

      {/* Number circle */}
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, rgba(144,202,249,0.2) 0%, rgba(144,202,249,0.05) 100%)",
          border: "2px solid rgba(144,202,249,0.5)",
          flexShrink: 0,
          mb: { xs: 2, sm: 0 },
          mr: { xs: 0, sm: 3 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "primary.main",
          }}
        >
          {number}
        </Typography>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "1.1rem",
            mb: 0.5,
            color: "white",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: "0.9rem",
            lineHeight: 1.5,
            maxWidth: { xs: 280, sm: "none" },
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
}

const steps = [
  {
    number: "1",
    title: "Create Your Program",
    description:
      "Set up your exercises with target sets, reps, and starting weights.",
  },
  {
    number: "2",
    title: "Log Your Workouts",
    description:
      "Complete your sets and the app tracks your progress automatically.",
  },
  {
    number: "3",
    title: "Get Stronger",
    description:
      "Hit your targets and watch your weights increase automatically each week.",
  },
];

export function HowItWorksSection() {
  return (
    <Box
      sx={{
        py: { xs: 6, sm: 10 },
        px: { xs: 2, sm: 4, md: 6 },
        borderRadius: "24px",
        bgcolor: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 5, sm: 6 } }}>
        <Typography
          sx={{
            fontSize: "0.875rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 1.5,
            color: "primary.main",
          }}
        >
          How It Works
        </Typography>
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 4, sm: 2 }}
        justifyContent="space-between"
      >
        {steps.map((step, index) => (
          <Step
            key={step.number}
            {...step}
            isLast={index === steps.length - 1}
          />
        ))}
      </Stack>
    </Box>
  );
}
