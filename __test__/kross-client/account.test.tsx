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

    it.skip('check', async () => {
      const { check } = client.account.useAccountHooks();
      const { result } = renderHook(() => check(), {
        wrapper,
      });
      await act(async () => {
        await result.current.mutateAsync({
          bankId: "",
          accountNumber: "",
          name: "",
        });
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toBeDefined();
    }, 10000);

    it.skip('withdrawInit', async () => {
      const { withdrawInit } = client.account.useAccountHooks();
      const { result } = renderHook(() => withdrawInit(), {
        wrapper,
      });

      await act(async () => {
        await result.current.mutateAsync({
          member_no: 0,
          amount: 0,
        });
      });
      await waitFor(() => expect(result.current?.isSuccess).toBe(true));

      expect(result.current.data).toBeDefined();
    }, 10000);

    it.skip('withdrawCancel', async () => {
      const { withdrawCancel } = client.account.useAccountHooks()
      const { result } = renderHook(() => withdrawCancel(), {
        wrapper,
      })
      await act(async () => {
        await result.current.mutateAsync({
          idempotency_key: "",
        })
      });
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toBeDefined();
    }, 30000);

    it.skip('withdrawVerify', async () => {
      const { withdrawVerify } = client.account.useAccountHooks();
      const { result } = renderHook(() => withdrawVerify(), {
        wrapper,
      })
      await act(async () => {
        await result.current.mutateAsync({
          idempotency_key: '',
          verify_code: '',
        })
      })
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toBeDefined();
    }, 30000);
  });
});
