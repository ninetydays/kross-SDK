Account class
The `Account` class is a client for interacting with the Kross API's account-related endpoints. It extends the `KrossClientBase class` and provides methods for checking account information, registering and verifying accounts, and initiating and canceling withdrawals.

### Table of Contents

**Constructor** <br/>
**Methods** <br/>
*** - check()*** <br/>
*** - register()*** <br/>
***- verify()*** <br/>
***- withdrawInit()*** <br/>
***- withdrawCancel()*** <br/>
***- withdrawVerify()*** <br/>
**Hooks** <br/>
*** -useAccountHooks()***

**Constructor** <br/>
The `Account` class constructor accepts a KrossClientOptions object as its only argument. This object is used to configure the underlying Axios instance that makes the HTTP requests to the Kross API.

```ts
import { Account } from 'kross-sdk';

const account = new Account({
  baseURL: 'https://api.kross.com',
  accessId: 'afsdfsdfjsdfsd',
  secretKey: 'sdfsdfsdfsdfsdf',
});
```

**Methods** <br/>
`- check()` <br/>
The `check()` method is used to check the status of an account.

```ts
account.check({
    bankId,
    accountNumber,
    name,
});
```
##### Arguments <br/>
`bankId` - The ID of bank.
`accountNumber` : Account number of the user
`name`: name of the user

Return a response on success
```
{
  bankOwnerName: string;
  bankSearch: string;
  realBankOwnerName: string;
  tid: number;
}
```

`- register()` <br/>
The `register()` method is used to register a new account.

```ts
account.register({
  bankId,
  accountNumber,
  name,
  initial,
  user_id,
});
```

##### Arguments

`bankId` - ID of the bank account. <br/>
`accountNumber` - Account Number of the user. <br />
`name` - Name of the user. <br/>
`intial` - true or false if it intial registeration or updation of bank details <br/>

Return a response on success
```
{
  memAccntno: string;
  tid: number;
}
``` 


`- verify()`

The `verify()` method is used to verify an account.

```ts
account.verify({
  code,
  user_id
});
```

##### Arguments

`verification_code` - The verification code received by the account owner. <br />
`user_id` - User id of the logged in user <br/>

Return a response on success
```
{
  memAccntno: string;
  tid: number;
}
```

`- withdrawInit()` <br />
The `withdrawInit()` method is used to initiate a withdrawal from account.

```js
account.withdrawInit({
  amount ,
  member_no
});
```
##### Arguments 

`account_id` - The ID of the account from which to withdraw.
`amount` - The amount to withdraw. <br/>
`member_no` - member_no of the user <br />

Return a response on success
```
{
  tid: number;
  idempotency_key: string;
}
```

`- withdrawVerify()` <br />
The `withdrawVerify()` method is used to initiate a withdrawal from account.

```js
account.withdrawVerify({
    verify_code,
    idempotency_key
});
```
##### Arguments 

`verifiy_code` - verification code received on withdrawInit. <br/>
`idempotency_key` - idempotency_key from withdrawInit <br/>

Return a response on success
```
{
  tid: number;
  verifyWord: string;
}
```

`- withdrawCancel()` <br />
The `withdrawCancel()` method is used to initiate a withdrawal from account.

```js
account.withdrawCancel({
    idempotency_key
});
```
##### Arguments 
`idempotency_key` - idempotency_key from withdrawInit <br/>

Return a response on success
```
{
  tid: number;
}
```