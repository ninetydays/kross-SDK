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

  it.only('gets authToken and refreshToken', async () => {
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

  it('inquire about bank account verification', async () => {
    const { createInquiry } = client.useInquiriesHooks();
    const { result } = renderHook(() => createInquiry(), {
      wrapper,
    });
    await act(async () => {
      await result.current.mutateAsync({
        type: '계정 관련',
        detail: 'How can I get my account verified for making investments?',
        response: '',
        state: 'pending',
      });
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it.only('gets inquiries list for logged in user', async () => {
    const { fetchInquiries } = client.useInquiriesHooks();
    const { result } = renderHook(
      () =>
        fetchInquiries({
          skip: '0',
        }),
      {
        wrapper,
      }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    console.log('result.current.data', result.current.data?.pages);
    expect(result.current.data).toBeDefined();
  });

  it('respond to  inquiry', async () => {
    const { respondToInquiry } = client.useInquiriesHooks();
    const { result } = renderHook(() => respondToInquiry(), {
      wrapper,
    });
    await act(async () => {
      await result.current.mutateAsync({
        response:
          'You can get your account verified by sending us a picture of your ID card',
        inquiryId: '42',
        state: 'done',
      });
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it.only('gets inquiries count for not responded yet', async () => {
    const { respondedQueriesCount } = client.useInquiriesHooks();
    const { result } = renderHook(() => respondedQueriesCount(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });
};
