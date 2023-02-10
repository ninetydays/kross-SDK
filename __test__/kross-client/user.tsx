import { QueryClient, QueryClientProvider } from 'react-query';
import { User } from '../../src/kross-client/user';
import React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';
export const user = () => {
  let client: User;
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
    client = new User({
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
  
  it('gets current user data details', async () => {
    const { userData } = client.useUserHooks();
    const { result } = renderHook(() => userData({}), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it('gets current user-note list', async () => {
    const { userNoteLogs } = client.useUserHooks();
    const { result } = renderHook(() => userNoteLogs({}), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it('gets current user account-log list', async () => {
    const { userAccountLogs } = client.useUserHooks();
    const { result } = renderHook(() => userAccountLogs({}), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it('gets kftc balance; how much investor can invest', async () => {
    const { kftcBalance } = client.useUserHooks();
    const { result } = renderHook(() => kftcBalance(), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it('gets link for account certificate issuance', async () => {
    const { getVirtualAccCertificate } = client.useUserHooks();
    const { result } = renderHook(() => getVirtualAccCertificate(), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it('gets virtual account status', async () => {
    const { checkVirtualAccount } = client.useUserHooks();
    const { result } = renderHook(() => checkVirtualAccount(), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it.skip('unregisters member from welcome', async () => {
    const { unRegisterMemeber } = client.useUserHooks();
    const { result } = renderHook(() => unRegisterMemeber(), {
      wrapper,
    });
    await act(async () => {
      await result.current.mutateAsync();
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it('unlock deposit control to allow user deposit to any bank account', async () => {
    const { releaseDepositControl } = client.useUserHooks();
    const { result } = renderHook(() => releaseDepositControl(), {
      wrapper,
    });
    await act(async () => {
      await result.current.mutateAsync();
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it('gets virtual account details', async () => {
    const { accountData } = client.useUserHooks();
    const enabled = true;
    const { result } = renderHook(() => accountData({}, {enabled}), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it('gets myPage data', async () => {
    const { myPageData } = client.useUserHooks();
    const { result } = renderHook(() => myPageData(), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it('gets total assets for each day', async () => {
    const { totalAssets } = client.useUserHooks();
    const { result } = renderHook(() => totalAssets(), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it('verified id card', async () => {
    const { idCardVerification } = client.useUserHooks();
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
    const { useBToken } = client.useUserHooks();
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

  it('OCR verification', async () => {
    const { idOcrVerification } = client.useUserHooks();
    const { result } = renderHook(() => idOcrVerification(), {
      wrapper,
    });
    await act(async () => {
      const file = Buffer.from(fs.readFileSync('/Users/azimuth/kross-SDK/__test__/kross-client/id.jpg'));
      const formData = new FormData();
      const blob = new Blob([file], { type: 'image/jpeg' });
      formData.append("image", blob, "id.jpg");
      formData.append('mask_mode', 'true');
        await result.current.mutateAsync({
          isForeigner: true,
          imageForm: formData,
      });
  })
    await waitFor(() => {
      const { data } = result.current;
      expect(data).toBeDefined();
    });
  }, 30000);
  
  it('register a user', async () => {
    const { userRegister } = client.useUserHooks();
    const { result } = renderHook(() => userRegister(), {
      wrapper,
    });
    await act(async () => {
      await result.current.mutateAsync({
        email: 'mad@kross.kr',
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  }, 30000);
};
