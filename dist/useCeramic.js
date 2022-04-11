var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useCallback } from 'react';
const QUERY = gql `
  query UseCeramicQuery {
    ceramic {
      client
      authenticated
    }
  }
`;
const CREATE_STREAM = gql `
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
const LOAD_STREAM = gql `
  mutation UseCeramicLoadStream($streamId: CeramicStreamId!, $opts: CeramicLoadStreamOpts) {
    ceramic {
      loadStream(streamId: $streamId, opts: $opts)
    }
  }
`;
export function useCeramic() {
    // note(carlos): has to be no-cache so `client` doesn't get frozen
    // by cache
    const { data, loading } = useQuery(QUERY, { fetchPolicy: 'no-cache' });
    const [createStreamMutation] = useMutation(CREATE_STREAM);
    const [loadStreamMutation] = useMutation(LOAD_STREAM);
    const createStream = useCallback((content, metadata, opts) => __awaiter(this, void 0, void 0, function* () {
        const result = yield createStreamMutation({ variables: { content, metadata, opts } });
        return result.data.ceramic.createStream;
    }), [createStreamMutation]);
    const loadStream = useCallback((streamId, opts) => __awaiter(this, void 0, void 0, function* () {
        const result = yield loadStreamMutation({ variables: { streamId, opts } });
        return result.data.ceramic.loadStream;
    }), [loadStreamMutation]);
    return {
        loading,
        client: (data === null || data === void 0 ? void 0 : data.ceramic.client) || null,
        authenticated: (data === null || data === void 0 ? void 0 : data.ceramic.authenticated) || false,
        createStream,
        loadStream,
    };
}
//# sourceMappingURL=useCeramic.js.map