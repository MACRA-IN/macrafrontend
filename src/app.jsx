import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from './pages/home/home';
import CartPage from './pages/cart/cart';
import BuyFlow from './pages/buyFlow/buyFlow';
import Dashboard from './pages/dashboard/dashboard';
import MenuPage from './components/home/menuSection';
import { AuthProvider } from './context/authContext';
import { CartProvider } from './context/cartContext';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/subscribe" element={<BuyFlow />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
