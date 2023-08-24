import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import LoginForm from './pages/loginform/LoginForm';
import SignupForm from './pages/signupform/SignupForm';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Nav from './components/nav/Nav';


function App() {
  return (
    <div>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} /> {/* 추가 */}
        <Route path="/signup" element={<SignupForm />} /> {/* 추가 */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
