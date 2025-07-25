import React, { useState, useEffect, useMemo } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Pagination,
  useMediaQuery,
  useTheme
} from '@mui/material';
import productsData from '../../data/products';
import { Product } from '../../types/product';
import ProductCard from '../../components/ProductCard';
import ProductFilters from '../../components/ProductFilters';
import { useTranslation } from 'react-i18next';
import paintingsBg from '../../images/categories/paintings.jpg';

const Paintings: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State for products and loading
  const [products, setProducts] = useState<Product[]>(productsData.filter((product) => product.category === 'paintings'));
  const [loading, setLoading] = useState(false);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  const productsPerPage = 12;

  // Remove useEffect for fetching products

  // Calculate max price for the slider
  const maxPrice = Math.max(...products.map(p => p.price), 5000);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
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
  }, [products, searchQuery, sortBy, priceRange]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Event handlers
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (event: any) => {
    setSortBy(event.target.value);
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
    setSearchQuery('');
    setSortBy('title');
    setPriceRange([0, maxPrice]);
    setCurrentPage(1);
  };

  return (
    <Box sx={{ 
      position: 'relative',
      minHeight: 'calc(100vh - 64px)',
      color: 'white',
      paddingTop: '100px',
      paddingBottom: '40px',
      backgroundImage: `url(${paintingsBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 0,
      }
    }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          sx={{ 
            textAlign: 'center', 
            mb: 6, 
            fontWeight: 'bold', 
            color: 'var(--secondary-main)',
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)'
          }}
        >
          {t('categories.paintings.title')}
        </Typography>
        <Typography variant="subtitle1" align="center" sx={{ mb: 4, color: 'var(--secondary-main)', textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)' }}>
          {t('categories.paintings.description')}
        </Typography>

        <Grid container spacing={3}>
          {!isMobile && (
            <Grid item xs={12} md={3}>
              <Box sx={{ position: 'sticky', top: '100px' }}>
                <ProductFilters
                  searchQuery={searchQuery}
                  onSearchChange={handleSearchChange}
                  sortBy={sortBy}
                  onSortChange={handleSortChange}
                  priceRange={priceRange}
                  onPriceChange={handlePriceChange}
                  onResetFilters={resetFilters}
                  filterOpen={filterOpen}
                  onFilterOpenChange={setFilterOpen}
                  maxPrice={maxPrice}
                />
              </Box>
            </Grid>
          )}

          <Grid item xs={12} md={isMobile ? 12 : 9}>
            {isMobile && (
              <ProductFilters
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                sortBy={sortBy}
                onSortChange={handleSortChange}
                priceRange={priceRange}
                onPriceChange={handlePriceChange}
                onResetFilters={resetFilters}
                filterOpen={filterOpen}
                onFilterOpenChange={setFilterOpen}
                maxPrice={maxPrice}
              />
            )}

            {filteredProducts.length === 0 ? (
              <Typography align="center" color="text.secondary" sx={{ py: 8 }}>
                {t('products.noProducts')}
              </Typography>
            ) : (
              <>
                <Grid container spacing={4}>
                  {paginatedProducts.map(product => (
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
      </Container>
    </Box>
  );
};

export default Paintings; 