import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./index.css";
import Home from './pages/home/home';
import CartPage from './pages/cart/cart';
import BuyFlow from './pages/buyFlow/buyFlow';
import Dashboard from './pages/dashboard/dashboard';
import MenuPage from './components/home/menuSection';
import PrivacyPolicy from './pages/legal/privacyPolicy';
import TermsAndConditions from './pages/legal/termsAndConditions';
import RefundPolicy from './pages/legal/refundPolicy';
import DeliveryPolicy from './pages/legal/deliveryPolicy';
import ContactPage from './pages/legal/contactPage';
import About from './pages/about/about';
import MobileNav from './components/home/mobileNav';
import { AuthProvider, useAuth } from './context/authContext';
import { CartProvider } from './context/cartContext';
import AuthModal from './components/auth/authModal';

function ProtectedRoute({ children }) {
  const { user, loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(true);

  if (user) return children;

  return show ? (
    <AuthModal
      onClose={() => { setShow(false); navigate("/"); }}
      onSuccess={() => { setShow(false); navigate(location.pathname); }}
    />
  ) : null;
}

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/subscribe" element={<ProtectedRoute><BuyFlow /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/privacy-policy"  element={<PrivacyPolicy />} />
            <Route path="/terms"           element={<TermsAndConditions />} />
            <Route path="/refund-policy"   element={<RefundPolicy />} />
            <Route path="/delivery-policy" element={<DeliveryPolicy />} />
            <Route path="/contact"         element={<ContactPage />} />
            <Route path="/about"           element={<About />} />
          </Routes>
          <MobileNav />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
