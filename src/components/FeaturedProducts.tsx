import React, { useState, useEffect } from 'react';
import products from '../data/products';
import { Product } from '../types/product';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useTranslation } from 'react-i18next';
import '@splidejs/react-splide/css';
import featured from '../images/featured.jpg'
import { Box, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const FeaturedProducts: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true); // Always visible for debug
  const [isLoading, setIsLoading] = useState(false);
  const featuredProducts = products.filter(product => product.featured);
  console.log('All products at import:', products);
  console.log('Featured products:', featuredProducts);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('.featured-products-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <Box 
      className="featured-products-section"
      sx={{
        padding: '2rem 2rem',
        backgroundColor: '#f8f9fa',
        opacity: 1, // Always visible for debug
        transition: 'opacity 0.5s ease-out',
        borderRadius: '20px',
        backgroundImage: `url(${featured})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Container maxWidth="lg">
        <div style={{ textAlign: 'center', marginBottom: '3rem', color: 'white' }}>
          <h3 style={{
            fontSize: '2.5rem',
            color: 'white',
            marginBottom: '1rem',
            fontWeight: 600,
            position: 'relative',
            display: 'inline-block'
          }}>
            {t('home.featuredProducts')}
            <div style={{
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '3px',
              backgroundColor: 'white',
              borderRadius: '2px'
            }} />
          </h3>
          <p style={{
            color: 'white',
            fontSize: '1.1rem',
            maxWidth: '600px',
            margin: '1rem auto 0',
            lineHeight: '1.6'
          }}>
            {t('products.featuredDescription')}
          </p>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : featuredProducts.length === 0 ? (
          <div style={{ color: 'white', textAlign: 'center', fontSize: '1.2rem' }}>
            No featured products found.
          </div>
        ) : (
          <Splide
            options={{
              type: 'loop',
              perPage: Math.min(4, featuredProducts.length),
              gap: '2rem',
              autoplay: true,
              pauseOnHover: true,
              arrows: true,
              pagination: false,
              breakpoints: {
                1200: { perPage: 2 },
                768: { perPage: 1 },
                640: { perPage: 1 }
              }
            }}
            aria-label={t('home.featuredProducts')}
          >
            {featuredProducts.map((product, index) => (
              <SplideSlide key={product.id}>
                <div style={{
                  transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                  opacity: isVisible ? 1 : 0,
                  transition: `transform 0.5s ease-out ${index * 0.2}s, opacity 0.5s ease-out ${index * 0.2}s`,
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <ProductCard product={product} />
                </div>
              </SplideSlide>
            ))}
          </Splide>
        )}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button 
            variant="contained" 
            component={Link} 
            to="/products"
            sx={{
              backgroundColor: 'white',
              '&:hover': {
                backgroundColor: '#f0f0f0',
                color: 'var(--secondary-main)'
              },
              // Make button text white
              '& .MuiButton-label': {
                color: 'white',
              },
              color: 'white',
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid white',
            }}
          >
            {t('featuredProducts.viewAll')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedProducts; 