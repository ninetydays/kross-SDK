import { QueryClient, QueryClientProvider } from 'react-query';
import { User } from '../../src/kross-client/user';
import React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';
export const user = () => {
  let client: User;
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
    client = new User({
      baseURL,
      accessId,
      secretKey,
      adapter: require('axios/lib/adapters/http'),
    });
  });

  it('gets current user data details', async () => {
    const { userData } = client.useUserHooks();
    const { result } = renderHook(() => userData({}), {
      wrapper,
    });
    await waitFor(() => {
      const { data } = result.current;
      expect(data).toBeDefined();
    });
  }, 30000);

  it('gets current user-note list', async () => {
    const { userNoteLogs } = client.useUserHooks();
    const { result } = renderHook(() => userNoteLogs({}), {
      wrapper,
    });
    await waitFor(() => {
      const { data } = result.current;
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.data).toBeDefined();
  }, 30000);

  it('gets current user account-log list', async () => {
    const { userAccountLogs } = client.useUserHooks();
    const { result } = renderHook(() => userAccountLogs({}), {
      wrapper,
    });
    await waitFor(() => {
      const { data } = result.current;
      expect(data).toBeDefined();
    });
  }, 30000);

  it('gets kftc balance; how much investor can invest', async () => {
    const { kftcBalance } = client.useUserHooks();
    const { result } = renderHook(() => kftcBalance(), {
      wrapper,
    });
    await waitFor(() => {
      const { data } = result.current;
      expect(data).toBeDefined();
    });
  }, 30000);

  it('gets link for account certificate issuance', async () => {
    const { getVirtualAccCertificate } = client.useUserHooks();
    const { result } = renderHook(() => getVirtualAccCertificate(), {
      wrapper,
    });
    await waitFor(() => {
      const { data } = result.current;
      expect(data).toBeDefined();
    });
  }, 30000);

  it('gets virtual account status', async () => {
    const { checkVirtualAccount } = client.useUserHooks();
    const { result } = renderHook(() => checkVirtualAccount(), {
      wrapper,
    });
    await waitFor(() => {
      const { data } = result.current;
      expect(data).toBeDefined();
    });
  }, 30000);

  it.skip('unregisters member from welcome', async () => {
    const { unRegisterMemeber } = client.useUserHooks();
    const { result } = renderHook(() => unRegisterMemeber(), {
      wrapper,
    });
    await act(async () => {
      await result.current.mutateAsync();
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  }, 30000);

  it('unlock deposit control to allow user deposit to any bank account', async () => {
    const { releaseDepositControl } = client.useUserHooks();
    const { result } = renderHook(() => releaseDepositControl(), {
      wrapper,
    });
    await act(async () => {
      await result.current.mutateAsync();
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  }, 30000);

  it('gets virtual account details', async () => {
    const { accountData } = client.useUserHooks();
    const { result } = renderHook(() => accountData({}), {
      wrapper,
    });
    await waitFor(() => {
      const { data } = result.current;
      expect(data).toBeDefined();
    });
  }, 30000);
};
