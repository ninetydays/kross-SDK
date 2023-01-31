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

  export const parseJwt  = (authToken: string) => {
    if (!authToken){
      return;
    }
    const date = new Date(0);
    const decoded = JSON.parse(Buffer.from(authToken.split('.')[1], 'base64').toString());
    date.setUTCSeconds(decoded.exp);
    if (new Date().valueOf() > date.valueOf()){
      return;
    }
    return decoded;
}