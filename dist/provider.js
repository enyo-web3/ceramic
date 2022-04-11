var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import CeramicClient from '@ceramicnetwork/http-client';
import { TileDocument } from '@ceramicnetwork/stream-tile';
import { DID } from 'dids';
export class CeramicProvider {
    constructor(options) {
        this.client = 'apiURL' in options ? new CeramicClient(options.apiURL) : options.client;
        this.didProvider = options.didProvider;
        this.authenticated = false;
        this.client.did = new DID({ resolver: options.didResolver });
    }
    createStream(content, metadata, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.client.did && !this.client.did.authenticated && this.didProvider) {
                this.client.did.setProvider(yield this.didProvider());
                yield this.client.did.authenticate();
                this.setAuthenticated(true);
            }
            return TileDocument.create(this.client, content, metadata, Object.assign({}, opts));
        });
    }
    loadStream(streamId, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            return TileDocument.load(this.client, streamId, opts);
        });
    }
    setAuthenticated(value) {
        this.authenticated = value;
    }
}
//# sourceMappingURL=provider.js.map