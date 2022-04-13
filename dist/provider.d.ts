import { CeramicApi, CreateOpts, LoadOpts, UpdateOpts } from '@ceramicnetwork/common';
import { TileDocument, TileMetadataArgs } from '@ceramicnetwork/stream-tile';
import type { EnyoProvider } from '@enyo-web3/core';
import { DIDOptions, DIDProvider } from 'dids';
import { EventEmitter } from 'events';
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
export declare class CeramicProvider extends EventEmitter implements EnyoProvider {
    client: CeramicApi;
    didProvider?: (() => Promise<DIDProvider>) | null;
    authenticated: boolean;
    constructor(options: CeramicProviderOptions);
    createStream(content: unknown, metadata?: TileMetadataArgs, opts?: CreateOpts): Promise<TileDocument<unknown>>;
    loadStream(streamId: Parameters<typeof TileDocument.load>[1], opts?: LoadOpts): Promise<TileDocument<unknown>>;
    updateStream(streamId: Parameters<typeof TileDocument.load>[1], content: unknown, metadata?: TileMetadataArgs, opts?: UpdateOpts): Promise<void>;
    private setAuthenticated;
}
export {};
