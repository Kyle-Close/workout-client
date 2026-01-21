import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { AppBar, IconButton } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { useNavigate } from "@tanstack/react-router";

export default function CustomAppBar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton onClick={() => navigate({ to: "/" })} aria-label="logo">
            <FitnessCenterIcon fontSize="large" color="primary" />
          </IconButton>
          <Button onClick={() => navigate({ to: "/account" })} color="inherit">
            Account
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
