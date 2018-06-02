import React from 'react';

import { Container } from 'semantic-ui-react';

import Header from './Header';

export default ({children}) => (
  <Container>
    <Header/>
    {children}
  </Container>
);