import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { AppBar, IconButton } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { useNavigate } from "@tanstack/react-router";

export default function CustomAppBar() {
  const navigate = useNavigate();
  const bg =
    "radial-gradient(circle,rgba(0, 72, 128, 1) 0%, rgba(1, 55, 97, 1) 51%, rgba(0, 72, 128, 1) 100%);";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ background: bg }} borderRadius={2} m={2} boxShadow={6}>
            <IconButton
              onClick={() => navigate({ to: "/" })}
              aria-label="logo"
              sx={{ transform: "rotate(-45deg)" }}
            >
              <FitnessCenterIcon fontSize="large" color="warning" />
            </IconButton>
          </Box>
          <Button onClick={() => navigate({ to: "/account" })} color="inherit">
            Account
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
