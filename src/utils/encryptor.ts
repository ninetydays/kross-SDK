import { createHmac } from 'crypto';
export const hmacHashString = (secretKey: string, message: string) => {
  const hmac = createHmac('sha256', secretKey);
  hmac.update(message);
  return hmac.digest('base64');
};

export const hmacTokenFunction =
  (accessId: string, secretKey: string) => () => {
    const date = new Date().toUTCString();
    const hashString = hmacHashString(secretKey, String(date));

    return {
      hmacToken: `KROSS ${accessId}:${hashString}`,
      xDate: date,
    };
  };
