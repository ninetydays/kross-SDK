import { QueryClient, QueryClientProvider } from 'react-query';
import { KrossClient } from '../../src/kross-client';
import React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';

describe('KrossClientBase', () => {
  describe('Token authorization', () => {
    let client: KrossClient;
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
      client = new KrossClient({
        baseURL,
        accessId,
        secretKey,
        adapter: require('axios/lib/adapters/http'),
      });
    });

    it.skip('investmenetCancel', async () => {
      const { investmentCancel } = client.investments.useInvestmentHooks();

      const { result } = renderHook(() => investmentCancel(), {
        wrapper,
      });

      await act(async () => {
        await result.current.mutateAsync({
          investment_id: 12323,
        });
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toBeDefined();
    }, 10000);


    it.skip('investmentRegister', async () => {
      const { investmentRegister } = client.investments.useInvestmentHooks();

      const { result } = renderHook(() => investmentRegister(), {
        wrapper,
      });

      await act(async () => {
        await result.current.mutateAsync({
          amount: 0,
          loan_id: 0,
          user_id: 0
        });
      });
      await waitFor(() => expect(result.current?.isSuccess).toBe(true));

      expect(result.current.data).toBeDefined();
    }, 10000);

    it('investmentList', async () => {
      const { investmentList } = client.investments.useInvestmentHooks();
      let queryResponse;
      await act(async () => {
        queryResponse = renderHook(() => investmentList(), {
          wrapper,
        });
      });

      const { result } = await queryResponse;
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toBeDefined();
    }, 30000);

    it('cmsTradebook', async () => {
      const { cmsTradebooks } = client.investments.useInvestmentHooks();

      let queryResponse;
      await act(async () => {
        queryResponse = renderHook(() => cmsTradebooks(), {
          wrapper,
        });
      });

      const { result } = await queryResponse;
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toBeDefined();
    }, 30000);

    it('notes', async () => {
      const { notes } = client.investments.useInvestmentHooks();

      let queryResponse;
      await act(async () => {
        queryResponse = renderHook(() => notes(), {
          wrapper,
        });
      });

      const { result } = await queryResponse;
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(result.current.data).toBeDefined();
    }, 30000);

  });
});
