import { QueryClient, QueryClientProvider } from 'react-query';
import { User } from '../../src/kross-client/user';
import React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';

describe('User', () => {
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

  it('login', async () => {
    const { useLogin } = client.useAuthHooks();

    const { result } = renderHook(() => useLogin(), {
      wrapper,
    });

    await act(async () => {
      await result.current.mutateAsync({
        keyid: 'mad@kross.kr',
        password: 'Kross123!',
      });
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  }, 30000);

  it('userData', async () => {
    const { userData } = client.useUserHooks();
    const { result } = renderHook(() => userData(), {
      wrapper,
    });
    await act(async () => {
      await result.current.refetch();
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  }, 30000);

  it('userNoteLogs', async () => {
    const { userNoteLogs } = client.useUserHooks();
    const { result } = renderHook(() => userNoteLogs(), {
      wrapper,
    });
    await act(async () => {
      await result.current.refetch();
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  }, 30000);

  it('userAccountLogs', async () => {
    const { userAccountLogs } = client.useUserHooks();
    const { result } = renderHook(() => userAccountLogs(), {
      wrapper,
    });
    await act(async () => {
      await result.current.refetch();
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  }, 30000);

  it('kftcBalance', async () => {
    const { kftcBalance } = client.useUserHooks();
    const { result } = renderHook(() => kftcBalance(), {
      wrapper,
    });
    await act(async () => {
      await result.current.refetch();
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  }, 30000);

  it('getVirtualAccountCertificate', async () => {
    const { getVirtualAccCertificate } = client.useUserHooks();
    const { result } = renderHook(() => getVirtualAccCertificate(), {
      wrapper,
    });
    await act(async () => {
      await result.current.refetch();
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  }, 30000);

  it('checkVirtualAccount', async () => {
    const { checkVirtualAccount } = client.useUserHooks();
    const { result } = renderHook(() => checkVirtualAccount(), {
      wrapper,
    });
    await act(async () => {
      await result.current.refetch();
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  }, 30000);

  it.skip('unRegisterMember', async () => {
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

  it('releaseDepositControl', async () => {
    const { releaseDepositControl } = client.useUserHooks();
    const { result } = renderHook(() => releaseDepositControl(), {
      wrapper,
    });
    await act(async () => {
      await result.current.mutateAsync();
    });
    console.log('Result for release: ', result.current.data);
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  }, 30000);

  it('accountData', async () => {
    const { accountData } = client.useUserHooks();
    const { result } = renderHook(() => accountData(), {
      wrapper,
    });
    await act(async () => {
      await result.current.refetch();
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  }, 30000);
});
