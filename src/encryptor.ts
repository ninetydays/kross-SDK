import { createHmac } from 'crypto'

export const hmacHashString = (secretKey: string, message: string) => {
  const hmac = createHmac('sha256', secretKey)
  hmac.update(message)
  return hmac.digest('base64')
}

export const getHmacToken = (method: string) => {
  const accessKey = process.env.REACT_APP_OLIVE_ACCESS_KEY;
  const secretKey = process.env.REACT_APP_OLIVE_SECRET_KEY;
  const date = new Date().toUTCString()
  const hashString = hmacHashString(
    secretKey as string,
    [date, method].join(' ')
  )

  return {
    hmacToken: `KROSS ${accessKey}:${hashString}`,
    xDate: date,
  }
}
