import reportWebVitals from './reportWebVitals';
import React from 'react';
import { render } from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  HttpLink,
  ApolloLink
} from "@apollo/client";
import Summary from './components/Summary';
import Overview from './components/Overview';
import Language from './components/Language';
import Repositories from './components/Repositories';

const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
});

const authMiddleware = new ApolloLink(
  (operation, forward) => {
      operation.setContext({
          headers: {
              authorization: 'bearer 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',
          },
      });

      return forward(operation);
  },
);

const link = ApolloLink.from([authMiddleware, httpLink]);

const client = new ApolloClient({
  link : link,
  cache: new InMemoryCache()
});


const GITHUB_DATA_QUERY = gql`
query { 
  viewer { 
    login
  }
}
`;

function GitData() {

  const { loading, error, data } = useQuery(GITHUB_DATA_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data;
}


function App() {
  const data = GitData();
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <div>{data.viewer?.login}</div>
      <Summary data={data}/>
      <Overview data={data}/>
      <Language data={data}/>
      <Repositories data={data}/>
    </div>
  );
}

render(

  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
