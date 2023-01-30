import { QueryClient, QueryClientProvider } from 'react-query';
import { Loans } from '../../src/kross-client/loans';
import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';

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
    await waitFor(() => {
      const { data } = result.current;
      expect(data).toBeDefined();
    });
  }, 30000);

  it('get loan repayments list when borrowers pay back', async () => {
    const { loanRepayments } = client.useLoanHooks();
    const { result } = renderHook(
      () =>
        loanRepayments({
          take: '5',
          skip: '0',
          order: 'id.asc',
        }),
      {
        wrapper,
      }
    );

    await waitFor(() => {
      const { data } = result.current;
      expect(data).toBeDefined();
    });
  }, 30000);

  it('gets loan payment schedule when investors pays for borrowers', async () => {
    const { loanPaymentSchedule } = client.useLoanHooks();
    const { result } = renderHook(
      () =>
        loanPaymentSchedule({
          loan_id: 19246,
        }),
      {
        wrapper,
      }
    );

    await waitFor(() => {
      const { data } = result.current;
      expect(data).toBeDefined();
    });
  }, 30000);

  it('gets list of the loans available', async () => {
    const { loanData } = client.useLoanHooks();
    const { result } = renderHook(
      () =>
        loanData({
          skip: '5',
          take: '3',
          order: 'id.asc',
        }),
      {
        wrapper,
      }
    );

    await waitFor(() => {
      const { data } = result.current;
      expect(data).toBeDefined();
    });
  }, 30000);

  it('new Product List available', async () => {
    const { loans } = client.useLoanHooks();
    const { result } = renderHook(() => loans({user_id: 14218}), {
      wrapper,
    });
    await waitFor(() => {
      const { data } = result.current;
      expect(data).toBeDefined();
    });
  }, 30000);

};
