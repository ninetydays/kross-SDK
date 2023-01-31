import { createHmac } from 'crypto';
import base64 from 'base-64';

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

export const parseJwt = async (authToken: string) => {
  if (!authToken) {
    return;
  }

  const [, payload] = authToken.split('.');

  const payloadDecoded = JSON.parse(base64.decode(payload));
  return payloadDecoded;
};
