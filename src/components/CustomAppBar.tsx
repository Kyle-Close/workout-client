import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { AppBar, IconButton } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "@tanstack/react-router";
import { USER_ID } from "../globals";

export default function CustomAppBar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "rgba(255,255,255,0.03)",
          borderBottom: 1,
          borderColor: "rgba(255,255,255,0.08)",
          backgroundImage: "none",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            minHeight: { xs: 56 },
            px: { xs: 1.5, sm: 2 },
          }}
        >
          <IconButton
            onClick={() => navigate({ to: "/" })}
            aria-label="logo"
            sx={{
              width: 42,
              height: 42,
              bgcolor: "rgba(144, 202, 249, 0.12)",
              "&:hover": { bgcolor: "rgba(144, 202, 249, 0.2)" },
            }}
          >
            <FitnessCenterIcon
              sx={{
                fontSize: 22,
                color: "primary.main",
                transform: "rotate(-45deg)",
              }}
            />
          </IconButton>
          <IconButton
            onClick={() => navigate({ to: `/users/${USER_ID}/account` })}
            aria-label="account"
            sx={{
              width: 42,
              height: 42,
              color: "text.secondary",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.06)",
                color: "text.primary",
              },
            }}
          >
            <AccountCircleIcon sx={{ fontSize: 26 }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
