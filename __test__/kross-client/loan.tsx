import { QueryClient, QueryClientProvider } from 'react-query';
import { Loans } from '../../src/kross-client/loans';
import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';

export const loan = () => {
  let client: Loans;
  const baseURL = process.env.baseURL as string;
  const accessId = process.env.accessId as string;
  const secretKey = process.env.secretKey as string;
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
          limit: '5',
          offset: '0',
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
          fields: 'id,loan_id,principal',
          limit: '5',
          sort_by: 'id.asc',
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
          offset: '5',
          limit: '3',
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

  it('get list of recently items: state == funding', async () => {
    const { recentFundingItem } = client.useLoanHooks();
    const { result } = renderHook(() => recentFundingItem(), {
      wrapper,
    });
    await waitFor(() => {
      const { data } = result.current;
      expect(data).toBeDefined();
    });
  }, 30000);
};
