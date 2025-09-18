import React from 'react';
import { useTranslation } from 'react-i18next';
import '../css/About.css';
import about from '../images/pottery.png';
import { Box, Container, Typography } from '@mui/material';

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: 'calc(100vh - 64px)',
                boxShadow: 'inset 1px 63px 7px 0px rgba(255, 255, 255, 0.9)',
       pt: { xs: '80px', md: '100px' },
        pb: { xs: '30px', md: '40px' },
        backgroundImage: `url(${about})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: 5,
            color: 'var(--secondary-main)',
            fontWeight: 'bold',
            fontSize: { xs: '1.8rem', md: '2.5rem' }
          }}
        >
          {t('about.title')}
        </Typography>

        <Box
          className="about-content"
          sx={{
            mx: 'auto',
            px: { xs: 2, sm: 4 },
            py: { xs: 3, sm: 4 },
            maxWidth: '1000px',
            color: 'var(--secondary-main)',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            border: '1px solid rgba(219, 211, 211, 0.3)',
            fontSize: { xs: '0.95rem', md: '1.1rem' }
          }}
        >
          <Typography paragraph>
            <strong>Naghilvari </strong>
            {t('about.description.part1')}
          </Typography>
          <Typography paragraph>
            {t('about.description.part2')}
          </Typography>
          <Typography paragraph>
            {t('about.description.part3')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
