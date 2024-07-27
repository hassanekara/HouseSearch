/* eslint-disable react/prop-types */

import { ApolloClient, InMemoryCache, ApolloProvider as Provider } from '@apollo/client';

// eslint-disable-next-line react-refresh/only-export-components
export const client = new ApolloClient({
  uri: 'http://localhost:4000/', // Replace with your GraphQL server URI
  cache: new InMemoryCache(),
});

const ApolloProvider = ({ children }) => (
  <Provider client={client}>
    {children}
  </Provider>
);

export default ApolloProvider;
