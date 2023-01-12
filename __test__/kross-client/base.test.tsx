import { QueryClient, QueryClientProvider } from 'react-query';
import { KrossClient } from '../../src/kross-client';
import React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';

describe('KrossClientBase', () => {
  describe('Token authorization', () => {
    let client: KrossClient;
    const baseURL = 'https://olive-dev.kross.kr';
    const accessId = 'XLD7UY9GETOK7TPY';
    const secretKey = 'yLbVRHGgwT5c22ndOVT2';
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          // ✅ turns retries off
          retry: false,
        },
      },
    });
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    beforeAll(() => {
      client = new KrossClient({
        baseURL,
        accessId,
        secretKey,
        adapter: require('axios/lib/adapters/http'),
      });
    });

    it('login', async () => {
      const { useLogin } = client.useAuthHooks();

      const { result } = renderHook(() => useLogin(), {
        wrapper,
      });

      await act(async () => {
        await result.current.mutateAsync({
          keyid: 'abc124@kross.kr',
          password: '12345',
        });
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toBeDefined();
    }, 30000);

    it.skip('get account data', async () => {
      const { accountData } = client.useAccountHooks();
      let queryResponse;
      await act(async () => {
        queryResponse = renderHook(() => accountData(), {
          wrapper,
        });
      });

      const { result } = queryResponse;
      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toBeDefined();
    }, 30000);
  });
});
