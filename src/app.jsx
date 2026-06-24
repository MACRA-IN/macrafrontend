import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from './pages/home/home';
import CartPage from './pages/cart/cart';
import { AuthProvider } from './context/authContext';
import { CartProvider } from './context/cartContext';
import CartDrawer from './components/cart/cartDrawer';
import BuyFlow from './pages/buyFlow/buyFlow';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="app">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/subscribe" element={<BuyFlow />} />
            </Routes>
          </Router>
        </div>
        <CartDrawer />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
