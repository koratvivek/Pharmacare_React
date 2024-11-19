import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import HomePage from './components/Home';
import Profile from './components/Profile';
import Product from './components/Product';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductDetails from './components/ProductDetails';
import SearchDoctors from './components/SearchDoctors';
import BookAppointment from './components/BookAppointment';
import PharmacyCarePackages from './components/HealthCarepackage';
import CartPage from './components/Cart';
import PaymentSuccess from './components/PaymentSucess';
import PaymentCanceled from './components/PaymnetCancel';
import NotFound from './components/Notfound';
import ContactUs from './components/ContactUs';
const App = () => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);
  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('authToken', newToken);
  };
  return (
    <Router>
      <div>
        <Navbar token={token} clearToken={() => setToken(null)} />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setToken={handleLogin} />} />
          {/* <Route path="*" element={<Navigate to="/login" />} /> */}
          <Route path="/logout" element={<Logout token={token} clearToken={() => setToken(null)} />} />
          <Route path="/profile" element={<Profile token={token} />} />
          <Route path="/products" element={<Product token={token} />} />
          <Route path="/product/:id" element={<ProductDetails token={token} />} />
          <Route path="/search_doctors" element={<SearchDoctors token={token} />} />
          <Route path="/book-appointment/:doctorId" element={<BookAppointment token={token} />} />
          <Route path="/cart" element={<CartPage token={token} />} />
          <Route path="/success" element={<PaymentSuccess token={token} />} />
          <Route path="/cancel" element={<PaymentCanceled token={token} />} />
          <Route path="/" element={<HomePage token={token} />} />
          <Route path="/packages" element={<PharmacyCarePackages token={token} />} />
          <Route path="/contact" element={<ContactUs token={token} />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;
