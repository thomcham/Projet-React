import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const endpoint = "https://api.sceno.io";

export const client = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache(),
});

export const httpLink = createHttpLink({
  uri: endpoint,
});
