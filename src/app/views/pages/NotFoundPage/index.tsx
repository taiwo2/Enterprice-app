import * as React from 'react';
import styled from 'styled-components/macro';
// import { P } from './P';
// import { Helmet } from 'react-helmet-async';
import { Box, Container, Typography, useMediaQuery } from '@material-ui/core';
import Page from 'app/components/pages';
export function NotFoundPage() {
  const mobileDevice = useMediaQuery('(max-width:650px)');
  return (
    <Page title="Not Found Page">
      <Container>
        <Box
          height={mobileDevice ? '50vh' : '100vh'}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography variant={mobileDevice ? 'h4' : 'h1'}>
            404 Page Not Found ☹
          </Typography>
        </Box>
      </Container>
    </Page>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;

const Title = styled.div`
  margin-top: -8vh;
  font-weight: bold;
  color: black;
  font-size: 3.375rem;

  span {
    font-size: 3.125rem;
  }
`;
