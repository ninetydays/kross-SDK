import { QueryClient, QueryClientProvider } from 'react-query';
import { KrossClient } from '../../src/kross-client';
import React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';

describe('KrossClientBase', () => {
  describe('Get user list', () => {
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
    it('userData', async () => {
      const { userData } = client.user.useUserHooks();
      let queryResponse;
      await act(async () => {
        queryResponse =  renderHook(() => userData(), {
          wrapper,
        });
      });
      const {result} = await queryResponse;
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toBeDefined();
    }, 30000);

    it('userNoteLogs', async () => {
      const { userNoteLogs } = client.user.useUserHooks();
      let queryResponse;
      await act(async () => {
        queryResponse =  renderHook(() => userNoteLogs(), {
          wrapper,
        });
      });
      const {result} = await queryResponse;
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toBeDefined();
    }, 30000);

    it('userAccountLogs', async () => {
      const { userAccountLogs } = client.user.useUserHooks();
      let queryResponse;
      await act(async () => {
        queryResponse =  renderHook(() => userAccountLogs(), {
          wrapper,
        });
      });
      const {result} = await queryResponse;
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toBeDefined();
    }, 30000);
    
    it('kftcBalance', async () => {
      const { kftcBalance } = client.user.useUserHooks();
      let queryResponse;
      await act(async () => {
        queryResponse =  renderHook(() => kftcBalance(), {
          wrapper,
        });
      });
      const {result} = await queryResponse;
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toBeDefined();
    }, 30000);

    it('getVirtualAccountCertificate', async () => {
      const { getVirtualAccCertificate } = client.user.useUserHooks();
      let queryResponse;
      await act(async () => {
        queryResponse =  renderHook(() => getVirtualAccCertificate(), {
          wrapper,
        });
      });
      const {result} = await queryResponse;
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toBeDefined();
    }, 30000);

    it('checkVirtualAccount', async () => {
      const { checkVirtualAccount } = client.user.useUserHooks();
      let queryResponse;
      await act(async () => {
        queryResponse =  renderHook(() => checkVirtualAccount(), {
          wrapper,
        });
      });
      const {result} = await queryResponse;
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toBeDefined();
    }, 30000);

    it('unRegisterMember', async () => {
      const { unRegisterMemeber } = client.user.useUserHooks();
      let queryResponse;
      await act(async () => {
        queryResponse =  renderHook(() => unRegisterMemeber(), {
          wrapper,
        });
      });
      const {result} = await queryResponse;
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toBeDefined();
    }, 30000);

    it('releaseDepositControl', async () => {
      const { releaseDepositControl } = client.user.useUserHooks();
      let queryResponse;
      await act(async () => {
        queryResponse =  renderHook(() => releaseDepositControl(), {
          wrapper,
        });
      });
      const {result} = await queryResponse;
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toBeDefined();
    }, 30000);

    it('accountData', async () => {
      const { accountData } = client.user.useUserHooks();
      let queryResponse;
      await act(async () => {
        queryResponse =  renderHook(() => accountData(), {
          wrapper,
        });
      });
      const {result} = await queryResponse;
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toBeDefined();
    }, 30000);
    
  });
});
