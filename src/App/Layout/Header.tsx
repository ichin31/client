import { Box, AppBar, Toolbar, IconButton, Typography, Button, Switch } from "@mui/material";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

export default function Header({darkMode,handleThemeChange}: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"  sx={{mb:4}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6">
            RE-STORE
          </Typography>
          <Switch 
              checked={darkMode}
              onChange={handleThemeChange}
              // inputProps={{ 'aria-label': 'controlled' }}
            />
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}