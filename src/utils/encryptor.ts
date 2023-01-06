import { createHmac } from 'crypto';

export const hmacHashString = (secretKey: string, message: string) => {
  const hmac = createHmac('sha256', secretKey);
  hmac.update(message);
  return hmac.digest('base64');
};

export const hmacTokenFunction =
  (accessId: string, secretKey: string) => (method: string) => {
    const date = new Date().toUTCString();
    const hashString = hmacHashString(
      secretKey as string,
      [date, method].join(' ')
    );

    return {
      hmacToken: `KROSS ${accessId}:${hashString}`,
      xDate: date,
    };
  };
