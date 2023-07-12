import { QueryClient, QueryClientProvider } from 'react-query';
import { SignContract } from '../../src/kross-client/sign-contract';
import React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';

export const signContractTest = () => {
  let client: SignContract;
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
    client = new SignContract({
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
        keyid: '35@kross.kr',
        password: 'Kross123!',
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it.skip('verifies the signed contract of two parties', async () => {
    const { signContractVerification } = client.useSignContracts();
    const { result } = renderHook(() => signContractVerification(), {
      wrapper,
    });
    await act(async () => {
      await result.current.mutateAsync({
        id: 1245,
        verificationCode: '12345',
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  }, 30000);

  
  it('gets sign contract', async () => {
    const { getSignContract } = client.useSignContracts();
    const { result } = renderHook(() => getSignContract({id: 20}, true),
       {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  }, 150000);
};
