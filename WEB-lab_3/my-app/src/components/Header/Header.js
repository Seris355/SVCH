import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Grid, IconButton } from '@mui/material';
import SpaIcon from '@mui/icons-material/Spa';

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        width: '100%',
        maxWidth: '1296px',
        margin: '0 auto',
        bgcolor: 'rgb(0, 0, 0)',
        color: 'rgb(255, 255, 255)',
        fontFamily: '"Cormorant Garamond", serif',
        animation: 'headerSlideIn 0.8s ease forwards',
        '@keyframes headerSlideIn': {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(0)' },
        },
        padding: 0,
        boxSizing: 'border-box',
      }}
    >
      <Toolbar
        sx={{
          width: '100%',
          maxWidth: '1296px',
          margin: '0 auto',
          padding: 0,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: '100%', maxWidth: '1296px' }}
        >
          <Grid
            item
            xs={4}
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: '4vw',
              justifyContent: 'flex-start',
            }}
          >
            <Button
              component={NavLink}
              to="/"
              color="inherit"
              sx={{ 
                '&:hover': { color: '#c70606' }, 
                textTransform: 'none',
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '18px',
                fontWeight: 600,
              }}
            >
              Главная
            </Button>
            <Button
              component={NavLink}
              to="/service"
              color="inherit"
              sx={{ 
                '&:hover': { color: '#c70606' }, 
                textTransform: 'none',
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '18px',
                fontWeight: 600,
              }}
            >
              Услуги
            </Button>
            <Button
              component={NavLink}
              to="/404"
              color="inherit"
              sx={{ 
                '&:hover': { color: '#c70606' }, 
                textTransform: 'none',
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '18px',
                fontWeight: 600,
              }}
            >
              404
            </Button>
          </Grid>

          <Grid
            item
            xs={4}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="logo"
              sx={{
                transition: 'transform 0.5s ease',
                '&:hover': {
                  animation: 'shake 1s ease-in-out 3',
                },
                '@keyframes shake': {
                  '25%': { transform: 'rotate(10deg)' },
                  '50%': { transform: 'rotate(-10deg)' },
                  '75%': { transform: 'rotate(5deg)' },
                  '100%': { transform: 'rotate(0deg)' },
                },
                '@media (max-width: 320px)': {
                  '& svg': { fontSize: '35px' },
                },
              }}
            >
              <SpaIcon sx={{ fontSize: 40, color: 'white' }} />
              <Typography 
                variant="h6" 
                sx={{ 
                  ml: 1,
                  fontFamily: '"Cormorant Garamond", serif',
                  fontWeight: 600,
                }}
              >
                Delote-Beauty
              </Typography>
            </IconButton>
          </Grid>

          <Grid
            item
            xs={4}
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: '4vw',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              component={NavLink}
              to="/our_team"
              color="inherit"
              sx={{ 
                '&:hover': { color: '#c70606' }, 
                textTransform: 'none',
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '18px',
                fontWeight: 600,
              }}
            >
              Мастера
            </Button>
            <Button
              component={NavLink}
              to="/contact"
              color="inherit"
              sx={{ 
                '&:hover': { color: '#c70606' }, 
                textTransform: 'none',
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '18px',
                fontWeight: 600,
              }}
            >
              Контакты
            </Button>
            <Button
              component={NavLink}
              to="/masterclass"
              color="inherit"
              sx={{ 
                '&:hover': { color: '#c70606' }, 
                textTransform: 'none',
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '18px',
                fontWeight: 600,
              }}
            >
              Мастер-классы
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;