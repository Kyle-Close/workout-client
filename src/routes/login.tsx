import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { useAuth } from "../auth";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const [tab, setTab] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (tab === 0) {
        await login(username, password);
      } else {
        await register(username, password);
      }
      navigate({ to: "/" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        px: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 4,
        }}
      >
        <FitnessCenterIcon
          sx={{
            fontSize: 32,
            color: "primary.main",
            transform: "rotate(-45deg)",
          }}
        />
        <Typography fontWeight={700} fontSize="1.5rem">
          Progression
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          borderRadius: "16px",
          bgcolor: "rgba(255,255,255,0.03)",
          border: 1,
          borderColor: "rgba(255,255,255,0.08)",
          p: 3,
        }}
      >
        <Tabs
          value={tab}
          onChange={(_, v) => {
            setTab(v);
            setError(null);
          }}
          variant="fullWidth"
          sx={{ mb: 3 }}
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
            required
            autoComplete="username"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
            required
            autoComplete={tab === 0 ? "current-password" : "new-password"}
          />

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading || !username || !password}
            sx={{ py: 1.2, fontWeight: 600 }}
          >
            {loading
              ? tab === 0
                ? "Logging in..."
                : "Registering..."
              : tab === 0
                ? "Login"
                : "Register"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
