The KrossClint class is a client for interacting with the Kross API's auth-related endpoints and other instances/clients like loans, investments and inquiry. It extends the KrossClientBase class and provides methods for login and refreshing tokens.

### Table of Contents
 --------------------------------------------

**Constructor** <br/>

**Methods** <br/>
***- login()*** <br/>
***- updateAuthToken()*** <br/>

**Hooks** <br/>
***- useAuthHooks()***

**Constructor** <br/>
 --------------------------------------------

The KrossClient class constructor accepts a KrossClientOptions object as its only argument. This object is used to configure the underlying Axios instance that makes the HTTP requests to the Kross API.
```ts
import { KrossClient } from 'kross-sdk';

const krossClient = new KrossClient({
  baseURL: 'https://api.kross.com',
  accessId: 'afsdfsdfjsdfsd',
  secretKey: 'sdfsdfsdfsdfsdf',
});
```
**Methods** <br/>
 --------------------------------------------

`- login()` <br/>
The `login()` method is used to login.
```ts
krossClient.login({
  'abcd@gmail.com',
  'abcd1234',
   true,
});
```
##### Arguments <br/>
`keyid` - email or business registeration number that user used while creating account <br/>
`password` - as name suggest <br />
`refreshExpiresIn (Optional)` - refreshExpiresIn to set token expiry in milli seconds <br/>

Return a response on success

```ts
{
  "token": "string",
  "refresh": "string"
}
```
 --------------------------------------------

`- updateAuthToken()` <br/>
The `updateAuthToken()` method is used to refresh tokens.

```ts
client.updateAuthToken();
```

Return response on success

```css
{
  "token": "string"
}
```
 --------------------------------------------


**Hooks** <br/>
 --------------------------------------------



`- useAuthHooks()` <br />
The `useAuthHooks()` method is used to return the react-query hooks for useLogin() and updateAuthToken() methods.

```ts
const {useLogin} = krossClient.useAuthHooks();
const {mutate: login, status} = useLogin();

login({
  keyid: 12323554646456,
  passoword: 132323555
}, {
  onSuccess : response => {},
  onError: error => {}
})


```
Return a response with react-query hooks for `useLogin()` and `updateAuthToken()` methods.