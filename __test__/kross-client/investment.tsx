import { QueryClient, QueryClientProvider } from 'react-query';
import { Investments } from '../../src/kross-client/investments';
import React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';
import { format, subMonths } from 'date-fns';

export const investment = () => {
  let client: Investments;
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
    client = new Investments({
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

  it('get Investment List', async () => {
    const { investmentList } = client.useInvestmentHooks();
    const { result } = renderHook(() => investmentList({}), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it('cancels the pending investment with investment_id', async () => {
    const { investmentCancel } = client.useInvestmentHooks();
    const { result } = renderHook(() => investmentCancel(), {
      wrapper,
    });
    await act(async () => {
      await result.current.mutateAsync({
        investment_id: 0,
      });
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it('registers investment when investor applies to certain loan', async () => {
    const { investmentRegister } = client.useInvestmentHooks();
    const { result } = renderHook(() => investmentRegister(), {
      wrapper,
    });
    await act(async () => {
      await result.current.mutateAsync({
        amount: 0,
        loan_id: 0,
      });
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it('gets cmsTradebooks list', async () => {
    const { cmsTradebook } = client.useInvestmentHooks();
    const { result } = renderHook(() => cmsTradebook({}), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it('gets notes list', async () => {
    const { notes } = client.useInvestmentHooks();
    const curDate = new Date;
    const endDate = format(new Date, 'yyyy-MM-dd');
    const startDate = format(subMonths(curDate, 1), 'yyyy-MM-dd');
    const { result } = renderHook(() => notes(
      {
        filter: `state||$eq||done;doneAt||$between||${startDate},${endDate}`,
        join: 'loan',
        order: 'doneAt.desc',
        skip: '0',
        take: '6',
      }
    ), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it('transactionHistory', async () => {
    const { transactionHistory } = client.useInvestmentHooks();
    const { result } = renderHook(() => transactionHistory({
      include: 'deposit',
      
    }), {
      wrapper,
    });
    await waitFor(async () => {
      const { data } = result.current;
      expect(data).toBeDefined();
    });
  });

  it('applied investments', async () => {
    const { appliedInvestments } = client.useInvestmentHooks();
    const { result } = renderHook(
      () =>
        appliedInvestments({
          filter: 'state||$eq||funding',
        }),
      {
        wrapper,
      }
    );
    await waitFor(async () => {
      const { data } = result.current;
      expect(data).toBeDefined();
    });
  });

  it('get investment limit for user', async () => {
    const { investmentLimit } = client.useInvestmentHooks();
    const { result } = renderHook(
      () =>
        investmentLimit({
          enabled: true,
        }),
      {
        wrapper,
      }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it('get returnOnInvestments', async () => {
    const { returnOnInvestments } = client.useInvestmentHooks();
    const curDate = new Date;
    const endDate = format(new Date, 'yyyy-MM-dd');
    const startDate = format(subMonths(curDate, 1), 'yyyy-MM-dd');
    const { result } = renderHook(
      () =>
        returnOnInvestments(startDate, endDate),
      {
        wrapper,
      }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });
};
