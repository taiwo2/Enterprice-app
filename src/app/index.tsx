import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { GlobalStyle } from 'styles/global-styles';
import { useTranslation } from 'react-i18next';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Routers from './routes';
import MainLayout from './layout/mainLayout';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <SnackbarProvider dense maxSnack={3}>
          <Helmet
            titleTemplate="%s - React Boilerplate"
            defaultTitle="React Boilerplate"
            htmlAttributes={{ lang: i18n.language }}
          >
            <meta
              name="description"
              content="A React Boilerplate application"
            />
          </Helmet>
          <MainLayout>
            <Routers />
          </MainLayout>
          <GlobalStyle />
        </SnackbarProvider>
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  );
}
