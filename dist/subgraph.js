"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CeramicSubgraph = void 0;
const client_1 = require("@apollo/client");
const core_1 = require("@enyo-web3/core");
const schema_1 = require("@graphql-tools/schema");
class CeramicSubgraph extends core_1.EnyoSubgraph {
    schema(providers) {
        const ceramicProvider = providers.ceramic;
        ceramicProvider.on('authenticatedChanged', authenticated => {
            this.writeQuery({
                query: (0, client_1.gql) `
          query WriteCeramicAuthentication {
            ceramic {
              authenticated
            }
          }
        `,
                data: {
                    ceramic: {
                        __typename: 'Ceramic',
                        authenticated,
                    },
                },
            });
        });
        return (0, schema_1.makeExecutableSchema)({
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
        return (0, client_1.gql) `
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
exports.CeramicSubgraph = CeramicSubgraph;
//# sourceMappingURL=subgraph.js.map