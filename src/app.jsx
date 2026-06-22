import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from './pages/home/home';
import { AuthProvider } from './context/authContext';

const App = () => {
  return (
    <AuthProvider>
      <div className="app">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
