"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CeramicProvider = void 0;
const http_client_1 = __importDefault(require("@ceramicnetwork/http-client"));
const stream_tile_1 = require("@ceramicnetwork/stream-tile");
const dids_1 = require("dids");
class CeramicProvider {
    constructor(options) {
        this.client = 'apiURL' in options ? new http_client_1.default(options.apiURL) : options.client;
        this.didProvider = options.didProvider;
        this.authenticated = false;
        this.client.did = new dids_1.DID({ resolver: options.didResolver });
    }
    createStream(content, metadata, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.client.did && !this.client.did.authenticated && this.didProvider) {
                this.client.did.setProvider(yield this.didProvider());
                yield this.client.did.authenticate();
                this.setAuthenticated(true);
            }
            return stream_tile_1.TileDocument.create(this.client, content, metadata, Object.assign({}, opts));
        });
    }
    loadStream(streamId, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            return stream_tile_1.TileDocument.load(this.client, streamId, opts);
        });
    }
    setAuthenticated(value) {
        this.authenticated = value;
    }
}
exports.CeramicProvider = CeramicProvider;
//# sourceMappingURL=provider.js.map