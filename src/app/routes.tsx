import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DashboardContent from './views/dashboard/dashboardContent';
import React, { Children } from 'react';
import SettingsPrivacy from './views/dashboard/settingsPrivacy';
import Dashboard from './layout/dashboard';
import Home from './views/pages/Home';
const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
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
            path="settings-privacy"
            element={
              <Dashboard>
                <SettingsPrivacy />
              </Dashboard>
            }
          />
        </Route>
      </Routes>

      {/* </BrowserRouter> */}
    </div>
  );
};

export default Routers;
