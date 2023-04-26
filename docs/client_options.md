### Client Options

```ts
const clientOptions = {
    baseURL: baseURL,
    accessId: accessId,
    secretKey: secretKey ,
    authToken: authToken,
    refreshToken: refreshToken,
    refreshTokenCallback: refreshTokenCallback,
    forceLogoutCallback: forceLogoutCallback
  };
```

### Client Options Description
--------------------------------------------

`baseURL`: A string that specifies the base URL of the API. This is the root URL that is used for all API requests. <br/>
`accessId`: A string that specifies the access ID for the API. This is a unique identifier that is used to authenticate the client with the API server.<br/>
`secretKey`: A string that specifies the secret key for the API. This is a secret value that is used to authenticate the client with the API server.<br/>
`authToken (Optional)`: A string that specifies the authentication token for the API. This is a token that is issued by the API server after the client has successfully authenticated.<br/>
`refreshToken (Optional)`: A string that specifies the refresh token for the API. This is a token that is used to request a new authentication token when the current token has expired.<br/>
`refreshTokenCallback (Optional)`: A function that is called when the refresh token is used to request a new authentication token. This function should handle the response from the server and update the authToken and refreshToken properties of the object.<br/>
`forceLogoutCallback (Optional)`: A function that is called when the refresh token get failed. You can do whatever you are supposed to do to logout user and clear login state<br/>

##### refreshTokenCallback will be like
```ts 
  const refreshTokenCallback = (token: string) => {
    storage.set('authToken', token);
  };
```

##### forceLogoutCallback will be like
```ts 
  const forceLogoutCallback = (token: string) => {
    storage.delete('authToken');
    storage.delete('refreshToken');
  };
```