import { CeramicApi, CreateOpts, LoadOpts, UpdateOpts } from '@ceramicnetwork/common';
import CeramicClient from '@ceramicnetwork/http-client';
import { TileDocument, TileMetadataArgs } from '@ceramicnetwork/stream-tile';
import type { EnyoProvider } from '@enyo-web3/core';
import { DID, DIDOptions, DIDProvider } from 'dids';
import { EventEmitter } from 'events';

export interface ProvidersWithCeramic {
  ceramic: CeramicProvider;
}

type ClientOrAPIUrl = { apiURL: string } | { client: CeramicApi };

export type CeramicProviderOptions = {
  didResolver?: DIDOptions['resolver'];
  didProvider?: (() => Promise<DIDProvider>) | null;
} & ClientOrAPIUrl;

export class CeramicProvider extends EventEmitter implements EnyoProvider {
  client: CeramicApi;
  didProvider?: (() => Promise<DIDProvider>) | null;
  authenticated: boolean;

  constructor(options: CeramicProviderOptions) {
    super();

    this.client = 'apiURL' in options ? new CeramicClient(options.apiURL) : options.client;
    this.didProvider = options.didProvider;
    this.authenticated = false;

    this.client.did = new DID({ resolver: options.didResolver });
  }

  async createStream(content: unknown, metadata?: TileMetadataArgs, opts?: CreateOpts) {
    if (this.client.did && !this.client.did.authenticated && this.didProvider) {
      this.client.did.setProvider(await this.didProvider());
      await this.client.did.authenticate();
      this.setAuthenticated(true);
    }

    return TileDocument.create(this.client, content, metadata, { ...opts, pin: true });
  }

  async loadStream(streamId: Parameters<typeof TileDocument.load>[1], opts?: LoadOpts) {
    return TileDocument.load(this.client, streamId, opts);
  }

  async updateStream(
    streamId: Parameters<typeof TileDocument.load>[1],
    content: unknown,
    metadata?: TileMetadataArgs,
    opts?: UpdateOpts
  ) {
    if (this.client.did && !this.client.did.authenticated && this.didProvider) {
      this.client.did.setProvider(await this.didProvider());
      await this.client.did.authenticate();
      this.setAuthenticated(true);
    }

    const stream = await TileDocument.load(this.client, streamId, opts);

    return stream.update(content, metadata, { ...opts, pin: true });
  }

  private setAuthenticated(value: boolean) {
    this.authenticated = value;

    this.emit('authenticatedChanged', this.authenticated);
  }
}
