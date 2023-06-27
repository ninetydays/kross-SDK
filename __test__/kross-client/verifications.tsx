import { QueryClient, QueryClientProvider } from 'react-query';
import { Verifications } from '../../src/kross-client/verifications';
import React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';
import formData from 'form-data';
import fs from 'fs';
import path from 'path';
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
        issueDate: '20221201',
      });
    });
    await waitFor(() => {
      const { data } = result.current;
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
        password: 'Kross123!',
      });
    });
    await waitFor(() => {
      const { data } = result.current;
      expect(data).toBeDefined();
    });
  }, 30000);

  it.skip('OCR verification', async () => {
    const { idOcrVerification } = client.useVerificationHook();
    const { result } = renderHook(() => idOcrVerification(), {
      wrapper,
    });

    await act(async () => {
      try {
        const imagePath = path.resolve(__dirname, '__test__/kross-client/idCard.jpg');
        const imageFile = fs.createReadStream(imagePath);

        const form = new formData();
        form.append('image', imageFile, 'idCard.jpeg');
        form.append('isForeigner', 'true');
        const IdOcrVerificationsDto = {
          image: form,
        };
        await result.current.mutateAsync(
          IdOcrVerificationsDto,
        );
      } catch (error) {
        console.error(error);
      }
    });

    await waitFor(() => {
      const { data } = result.current;
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

  it('get verification data', async () => {
    const { verifications } = client.useVerificationHook();
    const { result } = renderHook(() => verifications({
      filter: 'type||$eq||user_detail'
    },
      true), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  }, 150000);
};
