import React from 'react';
import { Navigate, Route } from 'react-router-dom';
const ProtectedRoute = props => {
  const token = localStorage.getItem('token');
  return token ? (
    <Route {...props} />
  ) : (
    <Navigate to={{ pathname: '/login' }} />
  );
};

export default ProtectedRoute;
