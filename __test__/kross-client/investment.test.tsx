import { QueryClient, QueryClientProvider } from 'react-query';
import {Investments} from '../../src/kross-client/investments'
import React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';
describe('Investment', () => {
  describe('Investment related functions', () => {
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
    it('investmentList', async () => {
      const { investmentList } = client.useInvestmentHooks();
      const { result } = renderHook(() => investmentList(), {
        wrapper,
      })
      await act(async () => {
        await result.current.refetch()
      });
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toBeDefined();
    }, 30000);


    it.skip('investmenetCancel', async () => {
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
    }, 10000);

    it('investmentRegister', async () => {
      const { investmentRegister } = client.useInvestmentHooks();
      const { result } = renderHook(() => investmentRegister(), {
        wrapper,
      });
      await act(async () => {
        await result.current.mutateAsync({
          amount: 0,
          loan_id: 0,
          user_id: 0,
        });
      });
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toBeDefined();
    }, 10000);

    it('cmsTradebook', async () => {
      const { cmsTradebooks } = client.useInvestmentHooks();
      const { result } = renderHook(()=> cmsTradebooks(), {
        wrapper,
      })
      await act(async () => {
        await result.current.refetch()
      });
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toBeDefined();
    }, 30000);

    it('notes', async () => {
      const { notes } = client.useInvestmentHooks();
      const { result } = renderHook(() => notes(), {
        wrapper,
      })
      await act(async () => {
        await result.current.refetch()
      });
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toBeDefined();
    }, 30000);

  });
});
