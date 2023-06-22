import { QueryClient, QueryClientProvider } from 'react-query';
import { Corporation } from '../../src/kross-client/corporations';
import React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';

export const CorporationTest = () => {
  let client: Corporation;
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
    client = new Corporation({
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
        keyid: 'islamkiani3275@gmail.com',
        password: '00000000',
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it('get corporation id', async () => {
    const { getCorporation } = client.useCorporationHook();
    const { result } = renderHook(() => getCorporation(), {
      wrapper,
    });
    await act(async () => {
      const params = {
        query: {
          user_id: '10180',
        },
        fields: 'id',
      };
      await result.current.mutateAsync({ params: params });
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });
};
