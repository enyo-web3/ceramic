import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useCallback } from 'react';

import type { CeramicProvider } from './provider';

const QUERY = gql`
  query UseCeramicQuery {
    ceramic {
      authenticated
    }
  }
`;

const CREATE_STREAM = gql`
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

const LOAD_STREAM = gql`
  mutation UseCeramicLoadStream($streamId: CeramicStreamId!, $opts: CeramicLoadStreamOpts) {
    ceramic {
      loadStream(streamId: $streamId, opts: $opts)
    }
  }
`;

export interface UseCeramicResult {
  authenticated: boolean;
  loading: boolean;
  createStream: CeramicProvider['createStream'];
  loadStream: CeramicProvider['loadStream'];
}

export function useCeramic() {
  // note(carlos): has to be no-cache so `client` doesn't get frozen
  // by cache
  const { data, loading } = useQuery(QUERY);
  const [createStreamMutation] = useMutation(CREATE_STREAM);
  const [loadStreamMutation] = useMutation(LOAD_STREAM);

  const createStream: CeramicProvider['createStream'] = useCallback(
    async (content, metadata, opts) => {
      const result = await createStreamMutation({ variables: { content, metadata, opts } });

      return result.data.ceramic.createStream;
    },
    [createStreamMutation]
  );

  const loadStream: CeramicProvider['loadStream'] = useCallback(
    async (streamId, opts) => {
      const result = await loadStreamMutation({ variables: { streamId, opts } });

      return result.data.ceramic.loadStream;
    },
    [loadStreamMutation]
  );

  return {
    loading,
    authenticated: data?.ceramic.authenticated || false,
    createStream,
    loadStream,
  };
}
