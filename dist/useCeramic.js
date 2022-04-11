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
exports.useCeramic = void 0;
const client_1 = require("@apollo/client");
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const react_1 = require("react");
const QUERY = (0, graphql_tag_1.default) `
  query UseCeramicQuery {
    ceramic {
      authenticated
    }
  }
`;
const CREATE_STREAM = (0, graphql_tag_1.default) `
  mutation UseCeramicCreateStream(
    $content: CeramicContent!
    $metadata: CeramicStreamMetadata
    $opts: CeramicCreateStreamOpts
  ) {
    ceramic {
      createStream(content: $content, metadata: $metadata, opts: $opts)
    }
  }
`;
const LOAD_STREAM = (0, graphql_tag_1.default) `
  mutation UseCeramicLoadStream($streamId: CeramicStreamId!, $opts: CeramicLoadStreamOpts) {
    ceramic {
      loadStream(streamId: $streamId, opts: $opts)
    }
  }
`;
function useCeramic() {
    // note(carlos): has to be no-cache so `client` doesn't get frozen
    // by cache
    const { data, loading } = (0, client_1.useQuery)(QUERY);
    const [createStreamMutation] = (0, client_1.useMutation)(CREATE_STREAM);
    const [loadStreamMutation] = (0, client_1.useMutation)(LOAD_STREAM);
    const createStream = (0, react_1.useCallback)((content, metadata, opts) => __awaiter(this, void 0, void 0, function* () {
        const result = yield createStreamMutation({ variables: { content, metadata, opts } });
        return result.data.ceramic.createStream;
    }), [createStreamMutation]);
    const loadStream = (0, react_1.useCallback)((streamId, opts) => __awaiter(this, void 0, void 0, function* () {
        const result = yield loadStreamMutation({ variables: { streamId, opts } });
        return result.data.ceramic.loadStream;
    }), [loadStreamMutation]);
    return {
        loading,
        authenticated: (data === null || data === void 0 ? void 0 : data.ceramic.authenticated) || false,
        createStream,
        loadStream,
    };
}
exports.useCeramic = useCeramic;
//# sourceMappingURL=useCeramic.js.map