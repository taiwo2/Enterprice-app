import React from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { saveClaimsAction } from 'features/auth/authSlice';
import { ClaimsType } from 'models/claimsType';
const ProtectedRoute = props => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  /* this is cleaning up the localStorage and redirecting user to login */
  if (!token) {
    localStorage.clear();
    return <Navigate to={{ pathname: '/login' }} />;
  }
  const decoded: ClaimsType = jwt_decode(token);
  const expiresAt = decoded.exp * 1000;
  const dateNow = Date.now();
  const isValid = dateNow <= expiresAt;
  dispatch(saveClaimsAction(decoded));
  return isValid ? <Outlet /> : <Navigate to={{ pathname: '/login' }} />;
};

export default ProtectedRoute;
