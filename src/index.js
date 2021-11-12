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
import './styles/styles.scss'

//Apollo client
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

//Query de l'Api de graphql pour github
const GITHUB_DATA_QUERY = gql`
query {
    viewer {
        login
        repositories(first: 5) {
            totalCount
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
            }
            nodes {
                name
                ref(qualifiedName: "main") {
                    target {
                    ... on Commit {
                            additions
                            deletions
                            history {
                                totalCount
                                edges {
                                    node {
                                        committedDate
                                    }
                                }
                            }
                        } 
                    }
                }
                languages(first:100) {
                    nodes {
                        name
                    }
                }
            }
        }
        following {
            totalCount
        }
        followers {
            totalCount
        }
        avatarUrl
        bio
        location
    }
}
`;

function GitData() {
    const { loading, error, data } = useQuery(GITHUB_DATA_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data;
}

//App qui remplace app.js
function App() {
    const data = GitData();
    if (!data.viewer)
        return <></>
    return (
        <div>
            <Summary data={data}/>
            <Overview data={data}/>
            <Language data={data}/>
            <Repositories data={data}/>
        </div>
    );
}

//Provider qui permet d'envoyé des donner a tous les composants enfants
render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root'),
);

reportWebVitals();
