import React from 'react';
import { Box, Typography, Link, Grid, IconButton, Divider } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import SpaIcon from '@mui/icons-material/Spa';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 4, px: 2 }}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        {}
        <Grid item xs={12} sm={3} textAlign="center">
          <IconButton aria-label="logo">
            <SpaIcon sx={{ fontSize: 50 }} />
          </IconButton>
        </Grid>

        {}
        <Grid item xs={12} sm={3} textAlign="center">
          <Typography variant="body1">+7 (812) 123-45-67</Typography>
          <Typography variant="body1">+7 (911) 123-45-67</Typography>
        </Grid>

        {}
        <Grid item xs={12} sm={3} textAlign="center">
          <Typography variant="body1">Новоостровский проспект, дом 36 лит.</Typography>
        </Grid>

        {}
        <Grid item xs={12} sm={3} textAlign="center">
          <Typography variant="body1">С 10:00 до 21:00 (Пн-Пт)</Typography>
          <Typography variant="body1">С 11:00 до 20:00 (Сб-Вс)</Typography>
        </Grid>

        {}
        <Grid item xs={12} sm={3} textAlign="center">
          <Link href="#" color="inherit">
            <IconButton aria-label="instagram">
              <InstagramIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Link>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Typography variant="body2" align="center">
        &copy; 2024 Салон красоты «Delote-Beauty». Все права защищены.
      </Typography>
    </Box>
  );
};

export default Footer;