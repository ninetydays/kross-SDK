import { QueryClient, QueryClientProvider } from 'react-query';
import { Loans } from '../../src/kross-client/loans';
import React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';
describe('Loan', () => {
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
      });
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  }, 30000);

  it('gets loanConfigs list', async () => {
    const { loanConfigs } = client.useLoanHooks();
    const { result } = renderHook(() => loanConfigs({}), {
      wrapper,
    });
    await act(async () => {
      await result.current.refetch();
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  }, 30000);

  it('get loan repayments list when borrowers pay back', async () => {
    const { loanRepayments } = client.useLoanHooks();
    const { result } = renderHook(
      () =>
        loanRepayments({
          fields: 'id,loan_id,principal',
          limit: '5',
          sort_by: 'id.asc',
        }),
      {
        wrapper,
      }
    );
    await act(async () => {
      await result.current.refetch();
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  }, 10000);

  it('gets loan payment schedule when investors pays for borrowers', async () => {
    const { loanPaymentSchedule } = client.useLoanHooks();
    const { result } = renderHook(
      () =>
        loanPaymentSchedule({
          loan_id: 0,
        }),
      {
        wrapper,
      }
    );
    await act(async () => {
      await result.current.refetch();
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  }, 10000);

  it('gets list of the loans available', async () => {
    const { loanData } = client.useLoanHooks();
    const { result } = renderHook(() => loanData({}), {
      wrapper,
    });
    await act(async () => {
      await result.current.refetch();
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  }, 30000);
});
