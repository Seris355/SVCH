import React from 'react';
import {
  // Основные компоненты
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  IconButton,
  Link,
  Divider,
  // Новые компоненты
  Container,
  Card,
  CardMedia,
  CardContent,
  Paper,
  Fade,
  Chip 
} from '@mui/material';
import { styled, keyframes } from '@mui/system';

// Анимации
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const shake = keyframes`
  25% {
    transform: rotate(10deg);
  }
  50% {
    transform: rotate(-10deg);
  }
  75% {
    transform: rotate(5deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

// Стилизованные компоненты с шрифтом Cormorant Garamond
const GlobalStylesBox = styled(Box)({
  '& *': {
    padding: 0,
    margin: 0,
    boxSizing: 'border-box',
    fontFamily: '"Cormorant Garamond", serif !important',
  },
  '& a': {
    color: '#ffffff',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
    '&:visited': {
      color: '#ffffff',
    },
  },
  '& ul': {
    listStyleType: 'none',
    paddingLeft: 0,
  },
  // Центрирование всего контента
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  width: '100%',
  fontFamily: '"Cormorant Garamond", serif',
});

const MainContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontFamily: '"Cormorant Garamond", serif',
});

const HeroSection = styled(Paper)(({ theme }) => ({
  height: '720px',
  width: '100vw',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 0,
  opacity: 1,
  animation: `${fadeIn} 2.2s ease-in-out forwards`,
  fontFamily: '"Cormorant Garamond", serif',
  [theme.breakpoints.down('md')]: {
    height: '30rem',
  },
  [theme.breakpoints.down('sm')]: {
    height: '25rem',
  },
}));

const HeroScroll = styled(Box)({
  maxWidth: '900px',
  textAlign: 'center',
  fontStyle: 'normal',
  width: '100%',
  fontFamily: '"Cormorant Garamond", serif',
});

const AnimatedImage = styled('img')({
  animation: `${shake} 4s ease-in-out infinite`,
});

const ProductCard = styled(Card)({
  '&:hover': {
    transition: 'transform 0.3s ease',
    transform: 'scale(1.03)',
  },
  fontFamily: '"Cormorant Garamond", serif',
});

const PartnersSection = styled(Box)(({ theme }) => ({
  marginTop: '5.12rem',
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: '1200px',
  padding: '0 50px',
  fontFamily: '"Cormorant Garamond", serif',
  [theme.breakpoints.down('lg')]: {
    padding: '0 40px',
  },
  [theme.breakpoints.down('md')]: {
    padding: '0 25px',
    gap: '20px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '0 16px',
    gap: '10px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
}));

const ProductGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '44px',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  fontFamily: '"Cormorant Garamond", serif',
  [theme.breakpoints.down('md')]: {
    gap: '30px',
  },
  [theme.breakpoints.down('sm')]: {
    gap: '20px',
    padding: '0 15px',
  },
}));

// Создаем тему с шрифтом Cormorant Garamond
const CormorantTypography = styled(Typography)({
  fontFamily: '"Cormorant Garamond", serif !important',
});

const Index = () => {
  const backgroundStyle = {
    backgroundImage: 'url(/images/main_page_images/main_background.png)',
  };

  const services = [
    {
      image: "/images/main_page_images/parik.png",
      title: "Консультация врача",
      link: "/service_page/service.html"
    },
    {
      image: "/images/main_page_images/mani.png",
      title: "Онлайн-консультация врача",
      link: "/service_page/service.html"
    },
    {
      image: "/images/main_page_images/pedi.png",
      title: "Подбор питания",
      link: "/service_page/service.html"
    },
    {
      image: "/images/main_page_images/kosme.png",
      title: "Сдать анализы",
      link: "/service_page/service.html"
    },
    {
      image: "/images/main_page_images/estet.png",
      title: "Расшифровать анализы",
      link: "/service_page/service.html"
    },
    {
      image: "/images/main_page_images/vizaz.png",
      title: "Ведение с врачом",
      link: "#"
    }
  ];

  const partners = [
    "/images/main_page_images/partner1.png",
    "/images/main_page_images/partner2.png",
    "/images/main_page_images/partner3.png",
    "/images/main_page_images/partnrer4.png"
  ];

  return (
    <GlobalStylesBox>
      <MainContainer>
        {/* Hero Section с Fade анимацией */}
        <HeroSection elevation={0} style={backgroundStyle}>
          <Fade in={true} timeout={2200}>
            <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center' }}>
              <HeroScroll>
                <CormorantTypography 
                  variant="h1" 
                  sx={{
                    fontSize: { xs: '50px', sm: '60px', md: '72px' },
                    fontWeight: 700,
                    lineHeight: { xs: '110%', sm: '120%' },
                    color: 'white',
                    padding: { xs: '20px', sm: '35px', md: '0 50px' },
                    textAlign: 'center',
                    width: '100%',
                    fontFamily: '"Cormorant Garamond", serif',
                  }}
                >
                  Школа диабета «Delote-Beauty» на Крестовском
                </CormorantTypography>
              </HeroScroll>
            </Container>
          </Fade>
        </HeroSection>

        {/* Reviews Section */}
        <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Box 
            sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '2rem auto 0',
              maxWidth: '850px',
              textAlign: 'center',
              width: '100%',
            }}
          >
            <AnimatedImage 
              src="/images/main_page_images/idk.svg" 
              alt="Декоративное изображение" 
            />
            <CormorantTypography 
              sx={{
                fontSize: { xs: '22px', sm: '25px', md: '27px' },
                fontWeight: 700,
                lineHeight: '130%',
                textAlign: 'center',
                padding: { xs: '0 20px', sm: 0 },
                mt: 2,
                width: '100%',
                color: 'white',
                fontFamily: '"Cormorant Garamond", serif',
              }}
            >
              Добро пожаловать в салон школу диабета, где рождается ваша неповторимая красота и здоровье! 
              Наши врачи – настоящие волшебники, способные подчеркнуть вашу природную привлекательность 
              и создать образ, который будет вызывать восхищение. Они подберут для вас индивидуальную 
              программу питания, соответствующее вашему характеру и образу жизни. Каждый визит к нам – 
              это не просто процедура, а настоящий ритуал, возвращающий молодость, энергию, красоту.
            </CormorantTypography>
          </Box>
        </Container>

        {/* Products Section */}
        <Box sx={{ 
          mt: '3.25rem', 
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center' }}>
            <ProductGrid container justifyContent="center">
              <Chip></Chip>
              {services.map((service, index) => (
                <Grid 
                  item 
                  key={index} 
                  xs={12} 
                  sm={6} 
                  md={4} 
                  lg={4}
                  sx={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    mb: { xs: 2, sm: 0 }
                  }}
                >
                  <Link href={service.link} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <ProductCard sx={{ 
                      maxWidth: 345,
                      width: { xs: 300, sm: 320, md: 345 },
                      mx: 'auto',
                      fontFamily: '"Cormorant Garamond", serif',
                    }}>
                      <CardMedia
                        component="img"
                        image={service.image}
                        alt={service.title}
                        sx={{ 
                          borderRadius: '10px',
                          width: '100%',
                          height: 200,
                          objectFit: 'cover'
                        }}
                      />
                      <CardContent sx={{ textAlign: 'center', bgcolor: 'background.paper' }}>
                        <CormorantTypography 
                          sx={{
                            fontSize: { xs: '24px', sm: '28px', md: '30px' },
                            fontWeight: 400,
                            lineHeight: '120%',
                            textAlign: 'center',
                            color: 'text.primary',
                            fontFamily: '"Cormorant Garamond", serif',
                          }}
                        >
                          {service.title}
                        </CormorantTypography>
                      </CardContent>
                    </ProductCard>
                  </Link>
                </Grid>
              ))}
            </ProductGrid>
          </Container>
        </Box>

        
  {/* Partners Section */}
        <Container maxWidth="lg">
          <PartnersSection>
            {partners.map((partner, index) => (
              <Box 
                key={index} 
                sx={{ 
                  maxWidth: { xs: '320px', sm: 'auto' },
                  height: { xs: '25%', sm: 'auto' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img 
                  src={partner} 
                  alt={`Партнер ${index + 1}`}
                  style={{ 
                    width: '100%', 
                    height: 'auto',
                    maxWidth: '100%'
                  }}
                />
              </Box>
            ))}
          </PartnersSection>
        </Container>

        {/* Divider для визуального разделения */}
        <Container maxWidth="lg" sx={{ mt: 5, mb: 3, display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Divider sx={{ 
            bgcolor: 'rgba(255,255,255,0.3)', 
            width: '100%',
            maxWidth: '1200px'
          }} />
        </Container>
      </MainContainer>
    </GlobalStylesBox>
  );
};

export default Index;
