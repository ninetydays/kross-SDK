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

  it('gets if user is verified or not', async () => {
    const { isUserVerified } = client.useUserHooks();
    const { result } = renderHook(() => isUserVerified(), {
      wrapper,
    });
    await waitFor(() => expect(result.current).toBe(true));
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
    const { result } = renderHook(() => accountData({ enabled }), {
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

  it.skip('register a user', async () => {
    const { userRegister } = client.useUserHooks();
    const { result } = renderHook(() => userRegister(), {
      wrapper,
    });
    await act(async () => {
      await result.current.mutateAsync({
        keyid: 'mad@kross.kr',
        password: 'blablabla',
        password2: 'blablabla',
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  }, 30000);

  it.skip('update a user', async () => {
    const { userUpdate } = client.useUserHooks();
    const { result } = renderHook(() => userUpdate(), {
      wrapper,
    });
    await act(async () => {
      await result.current.mutateAsync({
        email: 'mad@kross.kr',
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it.skip('check password of a user', async () => {
    const { checkPassword } = client.useUserHooks();
    const { result } = renderHook(() => checkPassword(), {
      wrapper,
    });
    await act(async () => {
      await result.current.mutateAsync({
        password: 'abcde',
      });
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it.skip('sends link to reset a user', async () => {
    const { resetPasswordEmail } = client.useUserHooks();
    const { result } = renderHook(() => resetPasswordEmail(), {
      wrapper,
    });
    await act(async () => {
      await result.current.mutateAsync({
        email: 'mad@kross.kr',
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });
  
  it.skip('sends link to reset a user', async () => {
    const { resetPasswordUpdate } = client.useUserHooks();
    const { result } = renderHook(() => resetPasswordUpdate(), {
      wrapper,
    });
    await act(async () => {
      await result.current.mutateAsync({
        password: '12321312',
        token: '21321321',
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it.skip('updates the user password', async () => {
    const { updatePassword } = client.useUserHooks();
    const { result } = renderHook(() => updatePassword(), {
      wrapper,
    });
    await act(async () => {
      await result.current.mutateAsync({
        oldPassword: '234q3211!',
        newPassword: '!4321dcba'
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it('gets user portfolio details', async () => {
    const { portfolio } = client.useUserHooks();
    const { result } = renderHook(() => portfolio(), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it('gets presigned url for s3 storage', async () => {
    const { getSignedURL } = client.useUserHooks();
    const { result } = renderHook(() => getSignedURL(), {
      wrapper,
    });
    await act(async () => {
      await result.current.mutateAsync('randomfile');
    });
    await waitFor(() => expect(result?.current?.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });

  it('gets user verification files list', async () => {
    const { userFilesList } = client.useUserHooks();
    const { result } = renderHook(() => userFilesList(), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });
  it('gets corporations ', async () => {
    const { getCorporations } = client.useUserHooks();
    const { result } = renderHook(() => getCorporations(), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });
  it('update corporations ', async () => {
    const { updateCorporation } = client.useUserHooks();
    const { result } = renderHook(() => updateCorporation(), {
      wrapper,
    });
    await act(async () => {
      await result.current.mutateAsync({
        corpId: 4023,
        state: 'request',
      });
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
  });
};
