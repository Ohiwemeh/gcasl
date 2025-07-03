import React from 'react';
import { Outlet } from 'react-router-dom';
// import Landing from './pages/Landing';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <>
      {/* This will render the matched child route */}
      <Outlet />
    </>
  );
}

export default App;