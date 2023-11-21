import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';
import { FCMManagement } from '../../src/kross-client';

export const fcmManagement = () => {
  let client: FCMManagement;
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
    client = new FCMManagement({
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

  it('get fcm tokens', async () => {
    const { fcmTokens } = client.useFCMTokenHook();
    const { result } = renderHook(() => fcmTokens(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  }, 15000);

  it('post fcm token', async () => {
    const { createFCMToken } = client.useFCMTokenHook();
    const { result } = renderHook(() => createFCMToken(), {
      wrapper,
    });
    await act(async () => {
      const responsePromise = result.current.mutateAsync({
        deviceId: '123',
        deviceType: 'android',
        token:
          'sdnfkjdsv7823bfdvs8y3hrbj32kr23refwef32r24treg43r34t2ef234243r23',
      });
      const response = await responsePromise;
      expect(response).toBeDefined();
    });
  });

  it('check If fcm Token exist', async () => {
    const { tokenExist } = client.useFCMTokenHook();
    const { result } = renderHook(() => tokenExist('sdnfkjdsv7823bfdvs8y3hrbj32kr23refwef32r24treg43r34t2ef234243r23'), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  }, 15000);
};
