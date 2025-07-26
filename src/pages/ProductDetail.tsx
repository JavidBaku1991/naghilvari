import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { Product } from '../types/product';
import products from '../data/products';
import { Box, Container, Grid, Typography, Button, Card, CardMedia, Chip, Divider, Paper, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CategoryIcon from '@mui/icons-material/Category';
import StraightenIcon from '@mui/icons-material/Straighten';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useTranslation } from 'react-i18next';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const { t } = useTranslation();

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === id);
    setProduct(foundProduct || null);
    setSelectedImage(foundProduct ? foundProduct.imageUrl : '');
  }, [id]);

  if (!product) {
    return (
      <Box minHeight="80vh" display="flex" alignItems="center" justifyContent="center" bgcolor="#f9f6f2">
        <Paper elevation={3} sx={{ p: 6, textAlign: 'center' }}>
          <Typography variant="h5" color="error" gutterBottom>
            {t('products.notFound', 'Product not found')}
          </Typography>
          <Button variant="contained" color="primary" component={RouterLink} to="/products" startIcon={<ArrowBackIcon />}>
            {t('products.backToProducts', 'Back to Products')}
          </Button>
        </Paper>
      </Box>
    );
  }

  // Use all images if available, otherwise fallback to [imageUrl]
  const images: string[] = product.images && product.images.length > 0 ? product.images : [product.imageUrl];

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        py: 8,
        position: 'relative',
        backgroundImage: `linear-gradient(rgba(60, 48, 48, 0.7), rgba(117, 107, 107, 0.7)), url(${selectedImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'var(--secondary-main)'
      }}
    >
      <Container maxWidth="md">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 4 , color: 'var(--secondary-main)', borderColor: 'var(--secondary-main)' }}
          variant="outlined"
        >
  {t('products.back', 'Back')}
          </Button>
        <Card sx={{
    borderRadius: 4,
    p: { xs: 2, md: 4 },
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
  }} className='details'>
          <Grid container spacing={4} alignItems="center">
            {/* Image Section */}
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2, borderRadius: 3, overflow: 'hidden', boxShadow: 2 }}>
                <CardMedia
                  component="img"
                  image={selectedImage}
                  alt={product.title}
                  sx={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 3 }}
                />
              </Box>
              {/* Image Gallery Thumbnails */}
            
            </Grid>
            {/* Info Section */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', color: 'var(--secondary-main)' }}>
       <Stack direction="row" spacing={1} alignItems="center" mb={1}>
  <MonetizationOnIcon sx={{ color: 'var(--secondary-main)' }} />
  <Typography variant="h5" fontWeight={600}>
    ₼{product.price.toLocaleString()}
  </Typography>
</Stack>
<Divider sx={{ my: 1, borderColor: 'var(--secondary-main)' }} />
<Stack direction="row" spacing={1} alignItems="center" mb={1}>
  <PersonIcon sx={{ color: 'var(--secondary-main)' }} />
  <Typography variant="body1">
    <b>{t('product.artist', 'Artist')}:</b> {product.artist || t('products.notAvailable', 'N/A')}
  </Typography>
</Stack>
<Divider sx={{ my: 1, borderColor: 'var(--secondary-main)' }} />
<Stack direction="row" spacing={1} alignItems="center" mb={1}>
  <CalendarTodayIcon sx={{ color: 'var(--secondary-main)' }} />
  <Typography variant="body1">
    <b>{t('product.year', 'Year')}:</b> {product.year}
  </Typography>
</Stack>
<Divider sx={{ my: 1, borderColor: 'var(--secondary-main)' }} />
<Stack direction="row" spacing={1} alignItems="center" mb={1}>
  <StraightenIcon sx={{ color: 'var(--secondary-main)' }} />
  <Typography variant="body1">
    <b>{t('product.dimensions', 'Dimensions')}:</b> {product.dimensions && product.dimensions.trim() !== '' ? product.dimensions : t('products.notAvailable', 'N/A')}
  </Typography>
</Stack>
                <Divider sx={{ my: 1, borderColor: 'var(--secondary-main)' }} />
<Typography variant="body1" sx={{ mb: 2 }}>
  {product.description
    ? t(`products.${product.id}.description`, product.description)
    : <span style={{ color: 'var(--secondary-main)' }}>{t('products.noDescription', 'Təsvir yoxdur')}</span>}
</Typography>
                
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};

export default ProductDetail; 