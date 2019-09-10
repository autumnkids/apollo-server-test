import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'http://localhost:4000'
});

const App = () => (
  <ApolloProvider client={client}>
    <div>Test</div>
  </ApolloProvider>
)

export default App;
