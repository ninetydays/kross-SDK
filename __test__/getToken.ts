import { KrossClient } from '../src/kross-client'
const client = new KrossClient({
  baseURL: 'https://olive-dev.kross.kr',
  accessId: '',
  secretKey: '',
})
const credentials = {
  0: { keyid: 'username@kross.kr', password: 'Paswword!' },
}

export const getToken = () => {
  return client
    .login(credentials[0].keyid, credentials[0].password)
    .then((res) => {
      return res?.data
    })
}
