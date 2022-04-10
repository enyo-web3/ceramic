import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { EnyoSupergraph } from '@enyo-web3/core';
import { randomBytes } from '@stablelib/random';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import KeyDidResolver from 'key-did-resolver';
import React from 'react';

import { CeramicProvider, CermaicSubgraph } from '../src';

const seed = randomBytes(32);
const didProvider = () => Promise.resolve(new Ed25519Provider(seed));

const supergraph = new EnyoSupergraph({
  subgraphs: [new CermaicSubgraph()],
  providers: {
    ceramic: new CeramicProvider({ client: ceramic, didProvider, didResolver: { ...KeyDidResolver.getResolver() } }),
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: supergraph.link(),
  typeDefs: supergraph.typeDefs(),
});

// eslint-disable-next-line react/display-name
export function Wrapper({ children }: React.PropsWithChildren<unknown>) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
