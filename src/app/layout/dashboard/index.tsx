import React from 'react';
import { Grid } from '@material-ui/core';
import SidebarNavigation from './sidebar-navigation';
type Props = {
  children: React.ReactNode;
};
const Dashboard = ({ children }: Props) => {
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      <SidebarNavigation />
      {children}
    </Grid>
  );
};
export default Dashboard;
