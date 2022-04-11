import { gql } from '@apollo/client';
import { makeExecutableSchema } from '@graphql-tools/schema';
export class CermaicSubgraph {
    schema(providers) {
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
                    createStream(_, args) {
                        return ceramicProvider.createStream(args.content, args.metadata, args.opts);
                    },
                    loadStream(_, args) {
                        return ceramicProvider.loadStream(args.streamId);
                    },
                },
            },
        });
    }
    typeDefs() {
        return gql `
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
//# sourceMappingURL=subgraph.js.map