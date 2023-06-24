import * as React from 'react';
import styled from 'styled-components/macro';
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