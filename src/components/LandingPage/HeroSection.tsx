import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useAuth } from "../../auth";

export function HeroSection() {
  const { user } = useAuth();

  return (
    <Box
      sx={{
        pt: { xs: 8, sm: 12, md: 16 },
        pb: { xs: 8, sm: 12 },
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Background glow effect */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: 300, sm: 500, md: 600 },
          height: { xs: 300, sm: 500, md: 600 },
          background: "radial-gradient(circle, rgba(144,202,249,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Logo */}
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: { xs: 80, sm: 100 },
          height: { xs: 80, sm: 100 },
          borderRadius: "24px",
          background: "linear-gradient(135deg, rgba(144,202,249,0.2) 0%, rgba(144,202,249,0.05) 100%)",
          border: "1px solid rgba(144,202,249,0.3)",
          mb: 4,
          position: "relative",
          zIndex: 1,
        }}
      >
        <FitnessCenterIcon
          sx={{
            fontSize: { xs: 40, sm: 50 },
            color: "primary.main",
            transform: "rotate(-45deg)",
          }}
        />
      </Box>

      {/* Main heading */}
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          mb: 2,
          position: "relative",
          zIndex: 1,
          background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.8) 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Train Smarter.
        <br />
        Track Everything.
      </Typography>

      {/* Subtitle */}
      <Typography
        sx={{
          fontSize: { xs: "1rem", sm: "1.25rem" },
          color: "text.secondary",
          maxWidth: 600,
          mx: "auto",
          mb: 5,
          lineHeight: 1.6,
          position: "relative",
          zIndex: 1,
        }}
      >
        Progressive overload on autopilot. Build your program once and let the app
        automatically adjust your weights each week so you keep getting stronger.
      </Typography>

      {/* CTA Buttons */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="center"
        sx={{ position: "relative", zIndex: 1 }}
      >
        {user ? (
          <>
            <Button
              component={Link}
              to="/dashboard"
              variant="contained"
              size="large"
              startIcon={<PlayArrowIcon />}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                borderRadius: "12px",
                textTransform: "none",
                background: "linear-gradient(135deg, #90caf9 0%, #64b5f6 100%)",
                boxShadow: "0 4px 20px rgba(144,202,249,0.3)",
                "&:hover": {
                  background: "linear-gradient(135deg, #64b5f6 0%, #42a5f5 100%)",
                  boxShadow: "0 6px 30px rgba(144,202,249,0.4)",
                },
              }}
            >
              Today's Workout
            </Button>
            <Button
              component={Link}
              to="/account"
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                borderRadius: "12px",
                textTransform: "none",
                borderColor: "rgba(255,255,255,0.2)",
                color: "white",
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.4)",
                  bgcolor: "rgba(255,255,255,0.05)",
                },
              }}
            >
              Account
            </Button>
          </>
        ) : (
          <>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                borderRadius: "12px",
                textTransform: "none",
                background: "linear-gradient(135deg, #90caf9 0%, #64b5f6 100%)",
                boxShadow: "0 4px 20px rgba(144,202,249,0.3)",
                "&:hover": {
                  background: "linear-gradient(135deg, #64b5f6 0%, #42a5f5 100%)",
                  boxShadow: "0 6px 30px rgba(144,202,249,0.4)",
                },
              }}
            >
              Get Started Free
            </Button>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                borderRadius: "12px",
                textTransform: "none",
                borderColor: "rgba(255,255,255,0.2)",
                color: "white",
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.4)",
                  bgcolor: "rgba(255,255,255,0.05)",
                },
              }}
            >
              Sign In
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
}
