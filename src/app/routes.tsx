import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DashboardContent from './views/dashboard/dashboardContent';
import React, { Children, lazy, Suspense } from 'react';
import SettingsPrivacy from './views/dashboard/settingsPrivacy';
import Dashboard from './layout/dashboard';
import Home from './views/pages/Home';
import About from './views/pages/About';
import { LinearProgress } from '@material-ui/core';
import ProductView from './views/dashboard/product/ProductView';
import Results from './views/dashboard/product/ProductList/Results';
import ProductList from './views/dashboard/product/ProductList';
import CalendarView from './views/dashboard/CalendarView';
import LoginPage from './views/pages/auth/LoginPage';
import ProtectedRoute from './components/protectedRoute';
import PricingPage from './views/pages/pricing/PricingPage';
import path from 'path';
import AccountView from './views/AccountView';
const Routers = () => {
  return (
    <div>
      <Suspense fallback={<LinearProgress style={{ margin: '10rem' }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <ProtectedRoute path="dashboard">
            <Route
              index
              element={
                <Dashboard>
                  <DashboardContent />
                </Dashboard>
              }
            />
            <Route
              path=""
              element={
                <Dashboard>
                  <ProductView />
                </Dashboard>
              }
            />
            <Route
              path="list-products"
              element={
                <Dashboard>
                  <ProductList />
                </Dashboard>
              }
            />
            <Route
              path="settings-privacy"
              element={
                <Dashboard>
                  <SettingsPrivacy />
                </Dashboard>
              }
            />
            <Route
              path="calendar"
              element={
                <Dashboard>
                  <CalendarView />
                </Dashboard>
              }
            />
          </ProtectedRoute>
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/pricing'} element={<PricingPage />} />

          <Route path={path + '/account'} element={<AccountView />} />
        </Routes>

        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Suspense>
    </div>
  );
};

export default Routers;
