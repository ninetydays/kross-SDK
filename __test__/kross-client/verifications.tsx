import { QueryClient, QueryClientProvider } from 'react-query';
import { Verifications } from '../../src/kross-client/verifications';
import React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';
import fetch from 'node-fetch';

export const verifications = () => {
  let client: Verifications;
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
    client = new Verifications({
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
        keyid: 'aziyatalik4@gmail.com',
        password: 'Kross123!',
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  }, 30000);

  it('verified id card', async () => {
    const { idCardVerification } = client.useVerificationHook();
    const { result } = renderHook(() => idCardVerification(), {
      wrapper,
    });
    await act(async () => {
      await result.current.mutateAsync({
        idType: '2',
        driverNo: '123456789',
        juminNo1: '12345',
        juminNo2: '12345',
        userName: 'dummy',
        issueNo1: '12390123',
        issueNo2: '12390123',
        issueDate: '20221201'
      });
    });
    await waitFor(() => {
      const { data } = result.current;
      console.log("data: ", data?.data);
      expect(data?.data).toBeDefined();
    });
  }, 30000);

  it('UseBToken', async () => {
    const { useBToken } = client.useVerificationHook();
    const { result } = renderHook(() => useBToken(), {
      wrapper,
    });
    await act(async () => {
      await result.current.mutateAsync({
        email: 'mad@kross.kr',
        password: 'Kross123!'
    });
    });
    await waitFor(() => {
      const { data } = result.current;
      console.log("data: ", data?.data);
      expect(data).toBeDefined();
    });
  }, 30000);
  
  it.only('OCR verification', async () => {
    const { idOcrVerification } = client.useVerificationHook();
    const { result } = renderHook(() => idOcrVerification(), {
      wrapper,
    });
  
    await act(async () => {
      try {
        const response = await fetch('http://localhost:8000/id.jpg', {
          method: 'GET',
          headers: {
            'content-type': 'image/jpeg'
          },
        });
        const blob = new Blob([await response.arrayBuffer()], { type: response.headers.get('content-type') });
        // image size matched with the blob size = we got image
        console.log('Blob size:', blob.size);
        const form = new FormData();
        form.append('image', blob);
        for (var pair of form.entries()) {
          console.log("getting", pair[0]+ ', ' + pair[1]); 
      }
        await result.current.mutateAsync({
          isForeigner: true,
          image: form,
        });
        
      } catch (error) {
        console.error(error);
      }    
    });
  
    await waitFor(() => {
      const { data } = result.current;
      console.log('Data value:', data);
      expect(data).toBeDefined();
    });
  }, 30000);

  it('Verifies phone', async () => {
    const { phoneVerification } = client.useVerificationHook();
    const { result } = renderHook(() => phoneVerification(), {
      wrapper,
    });
    await act(async () => {
      await result.current.mutateAsync({
        name: 'Suranme name',
        phone: '01012341234',
        birthdate: '19990909',
    });
    });
    await waitFor(() => {
      const { data } = result.current;
      expect(data).toBeDefined();
    });
  }, 30000);
};
