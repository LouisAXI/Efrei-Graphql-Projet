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
        repositories(first: 6) {
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
        <div className="container-all">
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

reportWebVitals();
