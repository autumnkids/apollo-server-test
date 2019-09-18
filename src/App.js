import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
// import ProductBlock from './approach1/product-block';
// import ProductBlock from './approach2/ProductBlock';
// import ProductBlock from './approach3/product-block';
import ProductBlock from './approach3-improved/product-block';

const client = new ApolloClient({
  uri: 'http://localhost:4000'
});

const App = () => (
  <ApolloProvider client={client}>
    <ProductBlock />
  </ApolloProvider>
);

export default App;
