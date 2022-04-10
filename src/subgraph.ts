import { gql } from '@apollo/client';
import type { EnyoSubgraph } from '@enyo-web3/core';
import { makeExecutableSchema } from '@graphql-tools/schema';

import type { CeramicProvider, ProvidersWithCeramic } from './provider';

interface CreateStreamMutationArgs {
  content: Parameters<CeramicProvider['createStream']>[0];
  metadata: Parameters<CeramicProvider['createStream']>[1];
  opts: Parameters<CeramicProvider['createStream']>[2];
}

interface LoadStreamMutationArgs {
  streamId: Parameters<CeramicProvider['loadStream']>[0];
}

export class CermaicSubgraph implements EnyoSubgraph<ProvidersWithCeramic> {
  schema(providers: ProvidersWithCeramic) {
    const ceramicProvider = providers.ceramic;

    return makeExecutableSchema({
      typeDefs: this.typeDefs(),
      resolvers: {
        Query: {
          ceramic() {
            return {};
          },
        },
        Ceramic: {
          client() {
            return ceramicProvider.client;
          },
          authenticated() {
            return ceramicProvider.authenticated;
          },
        },
        Mutation: {
          ceramic() {
            return {};
          },
        },
        CeramicMutations: {
          createStream(_, args: CreateStreamMutationArgs) {
            return ceramicProvider.createStream(args.content, args.metadata, args.opts);
          },
          loadStream(_, args: LoadStreamMutationArgs) {
            return ceramicProvider.loadStream(args.streamId);
          },
        },
      },
    });
  }

  typeDefs() {
    return gql`
      type Query {
        ceramic: Ceramic!
      }

      type Mutation {
        ceramic: CeramicMutations!
      }

      type Ceramic {
        client: CeramicClient!
        authenticated: Boolean!
      }

      type CeramicMutations {
        createStream(
          content: CeramicContent!
          metadata: CeramicStreamMetadata
          opts: CeramicCreateStreamOpts
        ): TileDocument!
        loadStream(streamId: CeramicStreamId!, opts: CeramicLoadStreamOpts): TileDocument!
      }

      scalar CeramicClient
      scalar CeramicContent
      scalar CeramicStreamId
      scalar CeramicStreamMetadata
      scalar CeramicCreateStreamOpts
      scalar CeramicLoadStreamOpts
      scalar TileDocument
    `;
  }
}
