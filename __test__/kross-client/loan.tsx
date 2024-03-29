import { QueryClient, QueryClientProvider } from 'react-query';
import { Loans } from '../../src/kross-client/loans';
import React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';

export const loan = () => {
  let client: Loans;
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
    client = new Loans({
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
        refreshExpiresIn: 40,
      });
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it('gets loanConfigs list', async () => {
    const { loanConfigs } = client.useLoanHooks();
    const { result } = renderHook(
      () =>
        loanConfigs({
          take: '5',
          skip: '0',
        }),
      {
        wrapper,
      }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it('get loan repayments list when borrowers pay back', async () => {
    const { loanRepayments } = client.useLoanHooks();
    const { result } = renderHook(() => loanRepayments({ take: '5' }), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it('gets loan payment schedule when investors pays for borrowers', async () => {
    const { loanPaymentSchedule } = client.useLoanHooks();
    const loan_id = 19246;
    const { result } = renderHook(() => loanPaymentSchedule(loan_id), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it('gets list of the loans available', async () => {
    const { loanData } = client.useLoanHooks();
    const { result } = renderHook(
      () =>
        loanData({
          filter: 'state||$in||funding',
          take: '5',
        }),
      {
        wrapper,
      }
    );
    await waitFor(() => {
      const { data } = result.current;
      expect(data?.pages).toBeDefined();
    });
  });
  it('gets id of the loan-repayments', async () => {
    const { loanRepaymentsPending } = client.useLoanHooks();
    const { result } = renderHook(() => loanRepaymentsPending(), {
      wrapper,
    });
    await waitFor(() => {
      const { data } = result.current;
      expect(data).toBeDefined();
    });
  });
  it('get loan detail', async () => {
    const { loanDetail } = client.useLoanHooks();
    const { result } = renderHook(() => loanDetail('39'), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  }, 150000);

  it('gets loan distribution', async () => {
    const { loanDistributions } = client.useLoanHooks();
    const { result } = renderHook(
      () =>
        loanDistributions({
          take: '5',
          skip: '0',
        }),
      {
        wrapper,
      }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });
};
