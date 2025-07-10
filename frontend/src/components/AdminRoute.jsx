// components/AdminRoute.jsx
import { Navigate } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';

const AdminRoute = ({ children }) => {
  const { user, checkingAuth } = useUserStore();

  if (checkingAuth) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/dashboard" replace />;
  
  return children;
};

export default AdminRoute;