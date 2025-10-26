import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Grid, IconButton } from '@mui/material';
import SpaIcon from '@mui/icons-material/Spa';

const Header = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          {}
          <Grid item>
            <Box display="flex" gap={2}>
              <Button component={NavLink} to="/" color="inherit">
                Главная
              </Button>
              <Button component={NavLink} to="/service" color="inherit">
                Услуги
              </Button>
              <Button component={NavLink} to="/404" color="inherit">
                404
              </Button>
            </Box>
          </Grid>

          {}
          <Grid item>
            <IconButton edge="start" color="inherit" aria-label="logo">
              <SpaIcon sx={{ fontSize: 40 }} /> {}
              <Typography variant="h6" sx={{ ml: 1 }}>
                Delote-Beauty
              </Typography>
            </IconButton>
          </Grid>

          {}
          <Grid item>
            <Box display="flex" gap={2}>
              <Button component={NavLink} to="/our_team" color="inherit">
                Мастера
              </Button>
              <Button component={NavLink} to="/contact" color="inherit">
                Контакты
              </Button>
              <Button component={NavLink} to="/masterclass" color="inherit">
                Мастер-классы
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;