import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';
import { GeneralInfo } from '../../src/kross-client';

export const generalInfo = () => {
  let client: GeneralInfo;
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
    client = new GeneralInfo({
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

  it('get doc terms for investor', async () => {
    const { docTerms } = client.useGeneralInfoHook();
    const { result } = renderHook(
      () =>
        docTerms({
          skip: '0',
          take: '1',
        }),
      {
        wrapper,
      }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  }, 15000);

  it('gets articles', async () => {
    const { articles } = client.useGeneralInfoHook();
    const { result } = renderHook(
      () =>
        articles({
          skip: '0',
          take: '1',
        }),
      {
        wrapper,
      }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  }, 15000);

  it('gets todays stats', async () => {
    const { todayStats } = client.useGeneralInfoHook();
    const { result } = renderHook(() => todayStats(), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  }, 15000);

  it('sends email to cs@kross.kr when user contacts', async () => {
    const { contactUs } = client.useGeneralInfoHook();
    const { result } = renderHook(() => contactUs(), {
      wrapper,
    });
    await act(async () => {
      const responsePromise = result.current.mutateAsync({
        name: 'Aziyat',
        email: 'test@test.com',
        subject: 'Test',
        phone: '010232083432',
        message: 'I am going for vacation, yay ',
      });
      const response = await responsePromise;
      expect(response).toBeDefined();
    });
  });
};
