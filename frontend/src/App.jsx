// import React from 'react';
import Landing from './pages/Landing';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import VerificationPage from "./pages/VerificationPage";
import AdminRoute from './components/AdminRoute';
import AdminPage from "./pages/AdminPage";
import Transfer from "./pages/Transfer";
import { Toaster } from 'react-hot-toast';

import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";



function App() {

   const { user, checkAuth, checkingAuth } = useUserStore();

 useEffect(() => {
  console.log("Checking auth...");
  checkAuth();
}, [checkAuth]);

console.log("User:", user);
console.log("Checking auth:", checkingAuth);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verification" element={<VerificationPage />} />
        
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin" element={
  <AdminRoute>
    <AdminPage />
  </AdminRoute>
} />
        <Route path="transfer" element={<Transfer />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App;
