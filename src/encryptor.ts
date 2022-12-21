import { createHmac } from 'crypto'

export const hmacHashString = (secretKey: string, message: string) => {
  const hmac = createHmac('sha256', secretKey)
  hmac.update(message)
  return hmac.digest('base64')
}

export const generateToken = () => {
  const accessId = 'XLD7UY9GETOK7TPY';
  const secretKey = 'yLbVRHGgwT5c22ndOVT2';
  const date = new Date().toUTCString();
  const hashString = hmacHashString(secretKey as string, [date, 'post'].join(' '));

  return {
    hmacToken: `KROSS ${accessId}:${hashString}`,
    xDate: date,
  };
};
