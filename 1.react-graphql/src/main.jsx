import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import './index.css'

// Crea un cliente Apollo
const client = new ApolloClient({
  uri: 'https://gorest.co.in/public/v2/graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization: 'Bearer 4bfc45a9aa35eda879f1655a4a59990e864a2674d68e37c792e0a73ae8c30efd',
  },
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
    </ApolloProvider>,
)
