import { CeramicApi } from '@ceramicnetwork/common';
import type { CeramicProvider } from './provider';
export interface UseCeramicResult {
    client: CeramicApi;
    authenticated: boolean;
    loading: boolean;
    createStream: CeramicProvider['createStream'];
    loadStream: CeramicProvider['loadStream'];
}
export declare function useCeramic(): {
    loading: boolean;
    client: any;
    authenticated: any;
    createStream: (content: unknown, metadata?: import("@ceramicnetwork/stream-tile").TileMetadataArgs | undefined, opts?: import("@ceramicnetwork/common").CreateOpts | undefined) => Promise<import("@ceramicnetwork/stream-tile").TileDocument<unknown>>;
    loadStream: (streamId: string | import("@ceramicnetwork/streamid").StreamID | import("@ceramicnetwork/streamid").CommitID, opts?: import("@ceramicnetwork/common").LoadOpts | undefined) => Promise<import("@ceramicnetwork/stream-tile").TileDocument<unknown>>;
};
