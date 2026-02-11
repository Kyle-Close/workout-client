import { Box, Grid, Stack, Typography } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EditNoteIcon from "@mui/icons-material/EditNote";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import AutoModeIcon from "@mui/icons-material/AutoMode";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

function FeatureCard({ icon, title, description, gradient }: FeatureCardProps) {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: "16px",
        bgcolor: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        height: "100%",
        transition: "all 0.3s ease",
        "&:hover": {
          bgcolor: "rgba(255,255,255,0.05)",
          borderColor: "rgba(255,255,255,0.15)",
          transform: "translateY(-4px)",
        },
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: gradient,
          mb: 2.5,
        }}
      >
        {icon}
      </Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          fontSize: "1.1rem",
          mb: 1,
          color: "white",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          color: "text.secondary",
          fontSize: "0.9rem",
          lineHeight: 1.6,
        }}
      >
        {description}
      </Typography>
    </Box>
  );
}

const features = [
  {
    icon: <AutoModeIcon sx={{ fontSize: 28, color: "white" }} />,
    title: "Automatic Progression",
    description: "Hit your target sets? The app automatically increases your weight next week. Progressive overload without the guesswork.",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    icon: <FitnessCenterIcon sx={{ fontSize: 28, color: "white" }} />,
    title: "Custom Programs",
    description: "Build personalized training programs tailored to your goals. Add exercises, set targets, and organize your week.",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    icon: <EditNoteIcon sx={{ fontSize: 28, color: "white" }} />,
    title: "Workout Logging",
    description: "Log every set, rep, and weight. Add notes to track how you felt and see plate breakdowns for barbell exercises.",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 28, color: "white" }} />,
    title: "Progress Tracking",
    description: "Visualize your strength gains over time with detailed charts and progression metrics for every exercise.",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
  {
    icon: <MonitorWeightIcon sx={{ fontSize: 28, color: "white" }} />,
    title: "Weight Tracking",
    description: "Monitor your body weight alongside your training. Track trends and see how your composition changes.",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
];

export function FeaturesSection() {
  return (
    <Box sx={{ py: { xs: 6, sm: 10 } }}>
      <Stack spacing={2} alignItems="center" sx={{ mb: { xs: 5, sm: 8 } }}>
        <Typography
          sx={{
            fontSize: "0.875rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 1.5,
            color: "primary.main",
          }}
        >
          Features
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "1.75rem", sm: "2.25rem" },
            fontWeight: 700,
            textAlign: "center",
            color: "white",
          }}
        >
          Everything You Need to Level Up
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            textAlign: "center",
            maxWidth: 500,
          }}
        >
          Powerful tools designed to help you build strength, track progress, and stay consistent.
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {features.map((feature) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={feature.title}>
            <FeatureCard {...feature} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
