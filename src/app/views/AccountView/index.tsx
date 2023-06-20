import React, { ChangeEvent, useState } from 'react';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles,
} from '@material-ui/core';
import Header from './Header';
import General from './General';
import Notifications from './Notifications';
import Security from './Security';
import Subscription from './Subscription';
import Page from 'app/components/pages';
const tabs = [
  { value: 'general', label: 'General' },
  { value: 'subscription', label: 'Subscription' },
  { value: 'notifications', label: 'Notifications' },
  { value: 'security', label: 'Security' },
];
const AccountView = () => {
  const classes = useStyles();
  /*initialize the useState to 'general' - we will use that */
  const [currentTab, setCurrentTab] = useState('general');
  /*handleTabsChange -for setting or updating the value of the current tab */
  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };
  return (
    <Page className={classes.root} title="Settings">
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <Tabs
            /*handleTabsChange - for the clicking and selection of tabs */
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={currentTab}
            variant="scrollable"
            textColor="secondary"
          >
            {/*we're going to iterate or loop on the tabs here */}
            {tabs.map(tab => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box mt={3}>
          {/*current tab by default is the General component.
 The rest is not displayed until clicked or selected */}
          {currentTab === 'general' && <General />}
          {currentTab === 'subscription' && <Subscription />}
          {currentTab === 'notifications' && <Notifications />}
          {currentTab === 'security' && <Security />}
        </Box>
      </Container>
    </Page>
  );
};
export default AccountView;
const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));
