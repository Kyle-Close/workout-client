import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { AppBar } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

export default function CustomAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <FitnessCenterIcon fontSize='large' color='primary' />
          <Button color="inherit">Account</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
