import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // ✅ Changed here
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './i18n/config';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import WorkIcon from '@mui/icons-material/Work';
import { Box } from '@mui/material';
import { useScrollToTop } from './hooks/useScrollToTop';
import { useLoadingNavigation } from './hooks/useLoadingNavigation';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Lazy imports
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const CategoryProducts = lazy(() => import('./pages/CategoryProducts'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Search = lazy(() => import('./pages/Search'));
const Paintings = lazy(() => import('./pages/products/Paintings'));
const Sculptures = lazy(() => import('./pages/products/Sculptures'));
const Ceramics = lazy(() => import('./pages/products/Ceramics'));
const Admin = lazy(() => import('./pages/Admin'));

const AppContent: React.FC = () => {
  useScrollToTop();
  useLoadingNavigation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<div style={{ textAlign: 'center', marginTop: '4rem' }}>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/paintings" element={<Paintings />} />
            <Route path="/products/sculptures" element={<Sculptures />} />
            <Route path="/products/ceramics" element={<Ceramics />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />

      {/* Global SpeedDial */}
      <Box sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1300 }}>
        <SpeedDial
          icon={<WorkIcon sx={{ color: 'var(--secondary-main)', backgroundColor: 'transparent' }} />}
          sx={{ backgroundColor: 'transparent' }}
          ariaLabel="Share on social media"
          FabProps={{
            sx: {
              backgroundColor: 'white',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            },
          }}
        >
          <SpeedDialAction
            icon={<FacebookIcon sx={{ color: '#1877F3' }} />}
            tooltipTitle="Facebook"
            onClick={() => window.open('https://facebook.com', '_blank')}
          />
          <SpeedDialAction
            icon={<TwitterIcon sx={{ color: '#1DA1F2' }} />}
            tooltipTitle="Twitter"
            onClick={() => window.open('https://twitter.com', '_blank')}
          />
          <SpeedDialAction
            icon={<InstagramIcon sx={{ color: '#E4405F' }} />}
            tooltipTitle="Instagram"
            onClick={() => window.open('https://instagram.com', '_blank')}
          />
          <SpeedDialAction
            icon={<WorkIcon sx={{ color: '#2164F3' }} />}
            tooltipTitle="Indeed"
            onClick={() => window.open('https://indeed.com', '_blank')}
          />
        </SpeedDial>
      </Box>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
