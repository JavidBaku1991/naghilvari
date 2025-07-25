import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import paint from '../images/paint2.jpg'

import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
  Drawer,
  Pagination
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
// import { getProductsByCategory } from '../services/productService';
import { Product } from '../types/product';

const CategoryProducts: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State for products and loading
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState('title');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const productsPerPage = 12;

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      if (!category) return;
      
      setLoading(true);
      try {
        // const productsData = await getProductsByCategory(category);
        // setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const handleSortChange = (event: any) => {
    setSortBy(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePriceChange = (event: any, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
    setCurrentPage(1);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setSortBy('title');
    setSearchQuery('');
    setPriceRange([0, 1000]);
    setCurrentPage(1);
  };

  const filteredProducts = products
    .filter(product => 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'priceAsc':
          return a.price - b.price;
        case 'priceDesc':
          return b.price - a.price;
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const FilterContent = () => (
    <Box sx={{ p: 2 ,        backgroundColor: 'white',
      borderRadius: '10px',
      padding: '10px',
      boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)'}}>
      <Box sx={{       display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 ,

      }}>
        <Typography variant="h6">{t('products.filters.title')}</Typography>
        <IconButton onClick={() => setFilterOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>{t('products.filters.sort')}</InputLabel>
        <Select
          value={sortBy}
          label={t('products.filters.sort')}
          onChange={handleSortChange}
        >
          <MenuItem value="title">{t('products.filters.sortByName')}</MenuItem>
          <MenuItem value="priceAsc">{t('products.filters.sortByPriceAsc')}</MenuItem>
          <MenuItem value="priceDesc">{t('products.filters.sortByPriceDesc')}</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label={t('products.filters.search')}
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
      />

      <Typography gutterBottom>{t('products.filters.priceRange')}</Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={0}
        max={1000}
        sx={{ mb: 2 }}
      />

      <Button
        fullWidth
        variant="outlined"
        onClick={resetFilters}
        sx={{ mb: 2 }}
      >
        {t('products.filters.reset')}
      </Button>
    </Box>
  );

  if (loading) {
    return (
      <Box sx={{ 
        backgroundImage: `url(${paint})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: 'calc(100vh - 64px)',
        color: 'white',
        paddingTop: '100px',
        paddingBottom: '40px'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Loading...
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box sx={{ 
        backgroundImage: `url(${paint})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: 'calc(100vh - 64px)',
        color: 'white',
        paddingTop: '100px',
        paddingBottom: '40px'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {category === 'digital-art' 
                ? t('products.categories.digitalArt')
                : t(`products.categories.${category}`)
              }
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
              {t('products.noProducts')}
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => navigate('/products')}
              sx={{ mt: 3 }}
            >
              {t('common.backToProducts')}
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      backgroundImage: `url(${paint})`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    minHeight: 'calc(100vh - 64px)',
      color: 'white',
      paddingTop: '100px',
      paddingBottom: '40px'
    }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {category === 'digital-art' 
              ? t('products.categories.digitalArt')
              : t(`products.categories.${category}`)
            }
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {category === 'digital-art' 
              ? t('products.categories.digitalArtDescription')
              : t(`products.categories.${category}Description`)
            }
          </Typography>
        </Box>

        {isMobile && (
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => setFilterOpen(true)}
            sx={{ mb: 2 }}
          >
            {t('products.filters.title')}
          </Button>
        )}

        <Grid container spacing={3}>
          {!isMobile && (
            <Grid item xs={12} md={3}>
              <Box sx={{ position: 'sticky', top: '100px' }}>
                <FilterContent />
              </Box>
            </Grid>
          )}

          <Grid item xs={12} md={isMobile ? 12 : 9}>
            {filteredProducts.length === 0 ? (
              <Typography align="center" color="text.secondary">
                {t('products.noProducts')}
              </Typography>
            ) : (
              <>
                <Grid container spacing={3}>
                  {paginatedProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                      <ProductCard product={product} />
                    </Grid>
                  ))}
                </Grid>

                {totalPages > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                      size="large"
                      sx={{
                        '& .MuiPaginationItem-root': {
                          color: 'white',
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                          },
                        },
                        '& .Mui-selected': {
                          backgroundColor: 'white',
                          color: 'black',
                          '&:hover': {
                            backgroundColor: 'white',
                          },
                        },
                      }}
                    />
                  </Box>
                )}
              </>
            )}
          </Grid>
        </Grid>

        <Drawer
          anchor="right"
          open={filterOpen}
          onClose={() => setFilterOpen(false)}
        >
          <Box sx={{ width: 280 }}>
            <FilterContent />
          </Box>
        </Drawer>
      </Container>
    </Box>
  );
};

export default CategoryProducts; 