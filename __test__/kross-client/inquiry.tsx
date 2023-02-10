import { QueryClient, QueryClientProvider } from 'react-query';
import { Inquiry } from '../../src/kross-client/inquiry';
import React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';

export const InquiryTest = () => {
  let client: Inquiry;
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
    client = new Inquiry({
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
  }, 30000);

  it('inquire about loans', async () => {
    const { postInuiry } = client.useInquiriesHooks();
    const { result } = renderHook(() => postInuiry(), {
      wrapper,
    });
    await act(async () => {
      await result.current.mutateAsync({
        type: '계정 관련',
        detail: 'How can I get my account verified for making investments?',
        response: 'No response',
      });
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    console.log('result.current.data', result.current.data);
    expect(result.current.data).toBeDefined();
  }, 10000);

  it('gets inquiries list for logged in user', async () => {
    const { getInquiries } = client.useInquiriesHooks();
    const { result } = renderHook(() => getInquiries({}), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    console.log('result.current.data', result.current.data);
    expect(result.current.data).toBeDefined();
  }, 30000);
};
