import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Product } from '../types/product';
import hero from '../images/hero.jpg'; // Fallback image

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, title, description, price, imageUrl, category, artist, year, dimensions } = product;
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Function to handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = hero; // Fallback image
  };

  const handleProductClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Navigate to product detail and scroll to top
    navigate(`/product/${id}`);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Card 
      sx={{ 
        height: '450px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
        },
        boxShadow: 4,
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: 'var(--secondary-main)',
        width: '100%',
        maxWidth: '300px',
      }}
    >
      <Link to={`/product/${id}`} style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleProductClick}>
        <CardMedia
          component="img"
          height="170"
          image={imageUrl}
          alt={title}
          onError={handleImageError}
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.3s ease-in-out',
            justifyContent: 'center',
            alignItems: 'center',
            '&:hover': {
              transform: 'scale(1.05)',
            },
            width: '100%',
            height: '200px'
          }}
        />
        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Box sx={{ mb: 1 }}>
            <Chip 
              label={t(`categories.${category}.title`, category)}
              size="small"
              sx={{ 
                backgroundColor: '#8B4513',
                color: 'white',
                fontSize: '0.75rem',
                height: '24px'
              }}
            />
          </Box>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="div"
            sx={{ 
              fontWeight: 600,
              color: 'white',
              mb: 1,
              fontSize: '1.1rem',
              lineHeight: 1.4
            }}
          >
            {t(`products.${id}.title`, title)}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              mb: 1,
              fontSize: '0.9rem',
              lineHeight: 1.5,
              color: 'white',
            }}
          >
            {t(`products.${id}.description`, description)}
          </Typography>
          <Typography variant="body2" sx={{ color: 'white', mb: 0.5 }}>
            <b>{t('product.artist', 'Artist')}:</b> {artist}
          </Typography>
          <Typography variant="body2" sx={{ color: 'white', mb: 0.5 }}>
            <b>{t('product.price', 'Price')}:</b> ₼{price}
          </Typography>
          <Typography variant="body2" sx={{ color: 'white', mb: 0.5 }}>
            <b>{t('product.year', 'Year')}:</b> {year}
          </Typography>
          {dimensions && (
            <Typography variant="body2" sx={{ color: 'white', mb: 0.5 }}>
              <b>{t('product.dimensions', 'Dimensions')}:</b> {dimensions}
            </Typography>
          )}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            alignItems: 'center',
            mt: 'auto'
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                color: 'white',
              }}
            >
              ₼{price.toFixed(2)}
            </Typography>
          </Box>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;