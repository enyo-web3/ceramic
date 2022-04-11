import { EnyoSubgraph } from '@enyo-web3/core';
import type { ProvidersWithCeramic } from './provider';
export declare class CeramicSubgraph extends EnyoSubgraph<ProvidersWithCeramic> {
    schema(providers: ProvidersWithCeramic): import("graphql").GraphQLSchema;
    typeDefs(): import("@apollo/client").DocumentNode;
}
