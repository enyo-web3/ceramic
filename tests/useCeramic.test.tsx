/**
 * @jest-environment ceramic
 */
import { renderHook, act } from '@testing-library/react-hooks';

import { useCeramic } from '../src';
import { Wrapper } from './wrapper';

test('ceramic client is initialized', async () => {
  const { result, waitFor } = renderHook(() => useCeramic(), { wrapper: Wrapper });

  await waitFor(() => !result.current.loading);

  expect(result.current.client).toEqual(expect.anything());
});

test('stream can be created', async () => {
  const { result, waitFor } = renderHook(() => useCeramic(), { wrapper: Wrapper });

  await waitFor(() => !result.current.loading);

  await act(async () => {
    const stream = await result.current.createStream({ test: 'test' });

    expect(stream.content).toEqual({ test: 'test' });
  });
});

test('stream can be loaded', async () => {
  const { result, waitFor } = renderHook(() => useCeramic(), { wrapper: Wrapper });

  await waitFor(() => !result.current.loading);

  await act(async () => {
    const createdStream = await result.current.createStream({ test: 'test' });
    const stream = await result.current.loadStream(createdStream.id);

    expect(stream.content).toEqual({ test: 'test' });
  });
});
