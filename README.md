## For Installing

`yarn add kross-sdk`

OR

`npm install kross-sdk`

## For Usage

### API Client

```js
import { KrossClient } from 'kross-sdk'

const client = new KrossClient({
  baseURL: 'https://da.kross.kr'
  accessId: 'youraccessid',
  secretKey: 'yoursecretkey',
  authToken: authToken,
  refreshToken: refreshToken,
  refreshTokenCallback: refreshTokenCallback,
});

```

### Optional Params Description
authToken, refreshToken, refreshTokenCallback:  These are optional Params

authToken: token received after login
refreshToken: refresh token after login
refreshTokenCallback: this is a callback that will accept function which will set token and refresh token in storage you are using in your client for refreshing tokens.

##### refreshTokenCallback will be like
```js 
  const refreshTokenCallback = (token: string) => {
    storage.set('authToken', token);
  };
```

-----------------------------------------------------



# Clients Provided
KrossClient, Account, Loans, Investments, Inquiry, User, Verifications

##### KrossClient : It is a base client through which you will be able to make requests any of the data providing APIs via axios instance.
##### Account : Contains functions and hooks through which you can make requests for account related data
##### Investment : Contains functions and hooks through which you can make requests for investments related data
##### Inquiry : Contains functions and hooks through which you can make requests for inquiries related data
##### User : Contains functions and hooks through which you can make requests for users related data
##### Loans : Contains functions and hooks through which you can make requests for loans related data
----------------------------------------------------


### Example of how to prepare clients for usage in real app

```js
import {storage} from 'utils/storage';
import {envVariables} from './../constants/envVariables';
import {
  KrossClient,
  Loans,
  Investments,
  User,
  Account,
  Inquiry,
} from 'kross-sdk';

export const useClients = () => {
  const authToken = storage.getString('authToken');
  const refreshToken = storage.getString('refreshToken');

  const refreshTokenCallback = (token: string) => {
    storage.set('authToken', token);
  };

  const clientOptions = {
    baseURL: baseURL,
    accessId: accessId,
    secretKey: secretKey,
    authToken: authToken,
    refreshToken: refreshToken,
    refreshTokenCallback: refreshTokenCallback,
  };
  const clients = {
    krossClient: new KrossClient(clientOptions),
    LoansClient: new Loans(clientOptions),
    InvestmentsClient: new Investments(clientOptions),
    UserClient: new User(clientOptions),
    AccountClient: new Account(clientOptions),
    InquiryClient: new Inquiry(clientOptions),
  };

  return clients;
};

```



