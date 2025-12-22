import React from 'react';
import { Box, Typography, Link, Grid, IconButton, Divider } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import SpaIcon from '@mui/icons-material/Spa';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        maxWidth: '1296px',
        margin: '0 auto',
        bgcolor: 'rgb(0, 0, 0)',
        color: 'rgb(255, 255, 255)',
        fontFamily: '"Cormorant Garamond", serif',
      }}
    >
      <Grid
        container
        spacing={3}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid textAlign="center">
          <IconButton
            aria-label="logo"
            sx={{
              '& img': {
                filter: 'invert(1)',
              },
              animation: 'shake 2s ease-in-out infinite',
              '@keyframes shake': {
                '25%': { transform: 'rotate(10deg)' },
                '50%': { transform: 'rotate(-10deg)' },
                '75%': { transform: 'rotate(5deg)' },
                '100%': { transform: 'rotate(0deg)' },
              },
              '@media (max-width: 768px)': {
                display: 'none',
              },
            }}
          >
            <SpaIcon sx={{ fontSize: 50, color: 'white' }} />
          </IconButton>
        </Grid>

        <Grid item xs={12} sm={3} textAlign="center">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography 
              variant="body1"
              sx={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              +7 (812) 123-45-67
            </Typography>
            <Typography 
              variant="body1"
              sx={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              +7 (911) 123-45-67
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={3} textAlign="center">
          <Typography 
            variant="body1"
            sx={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            Новоостровский проспект, дом 36 лит.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={3} textAlign="center">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography 
              variant="body1"
              sx={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              С 10:00 до 21:00 (Пн-Пт)
            </Typography>
            <Typography 
              variant="body1"
              sx={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              С 11:00 до 20:00 (Сб-Вс)
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={3} textAlign="center">
          <Link
            href="#"
            color="inherit"
            sx={{
              '&:hover': {
                transform: 'scale(1.05)',
                transition: 'transform 0.3s ease',
              },
            }}
          >
            <IconButton aria-label="instagram">
              <InstagramIcon sx={{ fontSize: 30, color: 'white' }} />
            </IconButton>
          </Link>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2, borderColor: '#4c4b4b' }} />

      <Typography
        variant="body2"
        align="center"
        sx={{ 
          fontSize: { xs: '12px', sm: '14px' },
          fontFamily: '"Cormorant Garamond", serif'
        }}
      >
        &copy; 2024 Салон красоты «Delote-Beauty». Все права защищены.
      </Typography>
    </Box>
  );
};

export default Footer;