import { InMemoryCache, ApolloProvider } from '@apollo/client';
import { EnyoSupergraph } from '@enyo-web3/core';
import { randomBytes } from '@stablelib/random';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import KeyDidResolver from 'key-did-resolver';
import React from 'react';

import { CeramicProvider, CeramicSubgraph } from '../src';

// eslint-disable-next-line react/display-name
export function Wrapper({ children }: React.PropsWithChildren<unknown>) {
  const seed = randomBytes(32);
  const didProvider = () => Promise.resolve(new Ed25519Provider(seed));

  const supergraph = new EnyoSupergraph({
    subgraphs: [new CeramicSubgraph()],
    providers: {
      ceramic: new CeramicProvider({ client: ceramic, didProvider, didResolver: { ...KeyDidResolver.getResolver() } }),
    },
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={supergraph.client}>{children}</ApolloProvider>;
}
