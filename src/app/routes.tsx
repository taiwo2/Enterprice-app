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
const Routers = () => {
  return (
    <div>
      <Suspense fallback={<LinearProgress style={{ margin: '10rem' }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="dashboard">
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
          </Route>
        </Routes>

        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Suspense>
    </div>
  );
};

export default Routers;
