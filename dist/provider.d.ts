import { CeramicApi, CreateOpts, LoadOpts } from '@ceramicnetwork/common';
import { TileDocument, TileMetadataArgs } from '@ceramicnetwork/stream-tile';
import type { EnyoProvider } from '@enyo-web3/core';
import { DIDOptions, DIDProvider } from 'dids';
export interface ProvidersWithCeramic {
    ceramic: CeramicProvider;
}
declare type ClientOrAPIUrl = {
    apiURL: string;
} | {
    client: CeramicApi;
};
export declare type CeramicProviderOptions = {
    didResolver?: DIDOptions['resolver'];
    didProvider?: (() => Promise<DIDProvider>) | null;
} & ClientOrAPIUrl;
export declare class CeramicProvider implements EnyoProvider {
    client: CeramicApi;
    didProvider?: (() => Promise<DIDProvider>) | null;
    authenticated: boolean;
    constructor(options: CeramicProviderOptions);
    createStream(content: unknown, metadata?: TileMetadataArgs, opts?: CreateOpts): Promise<TileDocument<unknown>>;
    loadStream(streamId: Parameters<typeof TileDocument.load>[1], opts?: LoadOpts): Promise<TileDocument<unknown>>;
    private setAuthenticated;
}
export {};
