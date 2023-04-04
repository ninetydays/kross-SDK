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

### KrossClient Params Description
[Client Options Object](docs/client_options.md)


-----------------------------------------------------



# Clients Provided
KrossClient, Account, Loans, Investments, Inquiry, User, Verifications

##### [KrossClient](docs/client.md) : It is a base client through which you will be able to make requests any of the data providing APIs via axios instance. 
##### [Accounts](docs/account.md) : Contains functions and hooks through which you can make requests for account related data 
##### [Investments](docs/investment.md) : Contains functions and hooks through which you can make requests for investments related data 
##### [Inquiry](docs/inquiry.md) : Contains functions and hooks through which you can make requests for inquiries related data 
##### [User](docs/user.md) : Contains functions and hooks through which you can make requests for users related data 
##### [Loans](docs/loans.md) : Contains functions and hooks through which you can make requests for loans related data 
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



