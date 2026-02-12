import { Box, Button, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { useAuth } from "../../auth";

export function CTASection() {
  const { user } = useAuth();

  return (
    <Box
      sx={{
        py: { xs: 8, sm: 10 },
        textAlign: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontSize: { xs: "1.75rem", sm: "2.25rem" },
          fontWeight: 700,
          mb: 2,
          color: "white",
        }}
      >
        Ready to get stronger?
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: "1rem", sm: "1.1rem" },
          color: "text.secondary",
          maxWidth: 400,
          mx: "auto",
          mb: 4,
        }}
      >
        Start training with automatic progression today.
      </Typography>
      <Button
        component={Link}
        to={user ? "/dashboard" : "/login"}
        variant="contained"
        size="large"
        sx={{
          px: 5,
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
        {user ? "Go to Dashboard" : "Get Started"}
      </Button>
    </Box>
  );
}
