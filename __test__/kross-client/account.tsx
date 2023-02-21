import { QueryClient, QueryClientProvider } from 'react-query';
import { Account } from '../../src/kross-client/account';
import React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';
export const account = () => {
  let client: Account;
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
    client = new Account({
      baseURL,
      accessId,
      secretKey,
      adapter: require('axios/lib/adapters/http'),
    });
  });

  it('gets authToken and refreshToken', async () => {
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
  });

  it.skip('checks bank account owner request', async () => {
    const { check } = client.useAccountHooks();
    const { result } = renderHook(() => check(), {
      wrapper,
    });
    await act(async () => {
      await result.current.mutateAsync({
        bankId: '049',
        accountNumber: 'random',
        name: 'randomName',
      });
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it.skip('checks request to withdraw amount via withdrawInit', async () => {
    const { withdrawInit } = client.useAccountHooks();
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
  });

  it.skip('checks request to cancel withdraw amount via withdrawCancel', async () => {
    const { withdrawCancel } = client.useAccountHooks();
    const { result } = renderHook(() => withdrawCancel(), {
      wrapper,
    });
    await act(async () => {
      await result.current.mutateAsync({
        idempotency_key: '0',
      });
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it.skip('registers withdraw account via withdrawVerify', async () => {
    const { withdrawVerify } = client.useAccountHooks();
    const { result } = renderHook(() => withdrawVerify(), {
      wrapper,
    });
    await act(async () => {
      await result.current.mutateAsync({
        idempotency_key: '0',
        verify_code: '1234',
      });
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });
};
