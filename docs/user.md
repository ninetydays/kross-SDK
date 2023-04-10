User class
The `User` class is a client for interacting with the Kross API's user-related endpoints. It extends the `KrossClientBase class` and provides methods for checking user information, user register/unregister and user virtual account information.

### Table of Contents
 --------------------------------------------

**Constructor** <br/>

**Methods** <br/>
***- userData()*** <br/>
***- getVirtualAccCertificate()*** <br/>
***- checkVirtualAccount()*** <br/>
***- registerMember()*** <br/>
***- unRegisterMemeber()*** <br/>
***- releaseDepositControl()*** <br/>
***- accountData()*** <br/>
***- userDataUpdate()*** <br/>
***- passwordCheck()*** <br/>
***- userAccountLogs()*** <br/>
***- kftcBalance()*** <br/>
***- userNoteLogs()*** <br/>
***- portfolio()*** <br/>

**Hooks** <br/>
***- useUserHooks()***

**Constructor** <br/>
 --------------------------------------------
The `User` class constructor accepts a KrossClientOptions object as its only argument. This object is used to configure the underlying Axios instance that makes the HTTP requests to the Kross API.

```ts
import { User } from 'kross-sdk';

const user = new User({
  baseURL: 'https://api.kross.com',
  accessId: 'afsdfsdfjsdfsd',
  secretKey: 'sdfsdfsdfsdfsdf',
});
```

**Methods** <br/>
 --------------------------------------------
`- userData()` <br/>
The `userData()` method is used to get user details.

```ts
user.userData(
  {
  userQuery :{
    take: '1',
    skip: '0'
     }, 
   enabled
   });
```
##### Arguments <br/>
`select (optional)`: A string that specifies which columns to select in the query. If not provided, all columns will be selected.<br/>
`skip (optional)`: A string that specifies the number of rows to skip in the result set. If not provided, no rows will be skipped.<br/>
`take (optional)`: A string that specifies the maximum number of rows to return in the result set. If not provided, all rows will be returned.<br/>
`order (optional)`: A string that specifies the sorting order for the result set. It can be used to sort data based on one or more columns in ascending or descending order. If not provided, the result set will not be sorted.<br/>
`filter (optional)`: A string that specifies the filter conditions to apply to the result set. It can be used to select rows that meet certain criteria based on the values of one or more columns. If not provided, no filters will be applied.<br/>
`join (optional)`: A string that specifies the join conditions to use when querying data from multiple tables. It can be used to retrieve data from related tables by specifying how the tables are related to each other. If not provided, no joins will be performed.<br/>
`enabled (0ptional)`: enabled to true means make request to backend false means don't make request to backend

Return an array of users data response on success
```
[{     
      "id": "string",
      "memberNo": "string",
      "keyid": "string",
      "name": "string",
      "memberType": "string",
      "state": "string",
      "nickName": "string",
      "birthday": "string",
      "ssn": "string",
      "email": "string",
      "mobile": "string",
      "zip": "string",
      "address1": "string",
      "address2": "string",
      "joinPath": "string",
      "kftcType": "string",
      "phoneVerified": true,
      "idCardVerified": true,
      "bankAccountVerified": true,
      "financialProvider": true,
      "isCorp": true,
      "fdsExcept": true,
      "depositControl": true,
      "notifyOnNewProducts": true,
      "notifyOnRepayments": true,
      "retireAt": "2023-03-30T10:55:44.490Z"
}]
```
 --------------------------------------------

`- getVirtualAccCertificate()` <br/>
The `getVirtualAccCertificate()` method is used to get virtual account certificate.

```ts
user.getVirtualAccCertificate();
```

Return a response on success
```
{
  url: string
}
``` 
 --------------------------------------------

`- checkVirtualAccount()`

The `checkVirtualAccount()` method is used to get virtual account details.

```ts
user.checkVirtualAccount();
```

Return a response on success
```
{
    insertDt: string,
    depoctlYn: string,
    useStatus: string,
    vaccntOwnerName: string,
    depoctlDepoBankAccNo: string
}
```
 --------------------------------------------

`- registerMember()` <br />
The `registerMember()` method is used to register a user.

```js
user.registerMember({
    keyid: 124;
    password: 'abcdefghsd';
    password2: 'abcdefghsd';
});
```
##### Arguments 

`keyid` - email or business resgiteration number.
`password` - password (length must be >= 8). <br/>
`password2` - confirm password <br />
`isBusiness(optional)` - in case if user registering is a business <br />
`isBorrower(optional)` - in case user registering is borrower <br />
`email(optional)` - email <br />
`corpRegNo(optional)` - corporation resgiteration number <br />
`name(optional)` - name of user/corporation/business <br />

Return a response on success
```
{
  token: string
}
```

 --------------------------------------------

`- unRegisterMemeber()` <br />
The `unRegisterMemeber()` method is used to unregister user.

```js
user.unRegisterMemeber();
```

Return a response on success
```
{
  data: {},
  okay: boolean,
  message: string | undefined
}
```

 --------------------------------------------

`- releaseDepositControl()` <br />
The `releaseDepositControl()` method is used unlock deposit control (that mean to allow to deposit any bank account).

```js
user.releaseDepositControl({
    idempotency_key
});
```

Return a response on success
```
{
  vaccntNo: string
}
```
 --------------------------------------------

`- accountData()` <br />
The `accountData()` method is used to get user account data.

```js
user.accountData(
  {
    accountQuery : {
      limit: '1',
      offset: '0'
    },
    enabled: true
  }
{
 
});
```

##### Arguments

`query` - query for filtering user data. <br/>
`limit, offset` : pagination props <br/>
`sort_by`: order lets you sort users data based on fields<br/>

Return an array of user data in response on success
```
[{
    "available_withdraw_amount": 0,
    "amount": 0,
    "pending_withdrawal": 0,
    "pending_investment": 0,
    "pending_etc": 0,
    "impossible_withdraw_sub_deposit_amount": 0,
    "bank_code": "string",
    "account_no": "string",
    "v_account_no": "string",
    "v_bank_code": "string"
}]
```
 --------------------------------------------

`- userDataUpdate()` <br />
The `userDataUpdate()` method is used to update user data.

```js
user.userDataUpdate({
 name: 'updatedName'
});
```

##### Arguments

`password`: A string representing the user's updated password. <br/>
`email`: A string representing the user's updated email address.<br/>
`name`: A string representing the user's updated name.<br/>
`memberType`: A string representing the user's updated membership type.<br/>
`kftcType`: A string representing the user's updated KFTC type.<br/>
`state`: A string representing the user's updated state.<br/>
`nickName`: A string representing the user's updated nickname.<br/>
`mobile`: A string representing the user's updated mobile phone number.<br/>
`zip`: A string representing the user's updated ZIP code.<br/>
`address1`: A string representing the user's updated address line 1.<br/>
`address2`: A string representing the user's updated address line 2.<br/>
`joinPath`: A string representing the user's updated join path.<br/>
`retireAt`: A string representing the user's updated retirement date.<br/>
`expireDate`: A string representing the user's updated expiration date.<br/>
`fdsExcept`: A boolean representing whether the user has opted out of FDS (Financial Data Services).<br/>
`depositControl`: A boolean representing whether the user has enabled deposit control.<br/>
`notifyOnNewProducts`: A boolean representing whether the user wants to be notified of new products.<br/>
`notifyOnRepayments`: A boolean representing whether the user wants to be notified of repayments.<br/>

Return updated user data in response on success
```
{
  "id": "string",
  "memberNo": "string",
  "keyid": "string",
  "name": "string",
  "memberType": "string",
  "state": "string",
  "nickName": "string",
  "birthday": "string",
  "ssn": "string",
  "email": "string",
  "mobile": "string",
  "zip": "string",
  "address1": "string",
  "address2": "string",
  "joinPath": "string",
  "kftcType": "string",
  "phoneVerified": true,
  "idCardVerified": true,
  "bankAccountVerified": true,
  "financialProvider": true,
  "isCorp": true,
  "fdsExcept": true,
  "depositControl": true,
  "notifyOnNewProducts": true,
  "notifyOnRepayments": true,
  "retireAt": "2023-03-30T10:35:31.908Z"
}
```
 --------------------------------------------

`- passwordCheck()` <br />
The `passwordCheck()` method is check validate password before doing secured manipulation.

```js
user.passwordCheck({
 password: '1234567890'
});
```

##### Arguments

`password` - password to validate the user <br/>


Return response on success
```
{
    status: 0
}
```
 --------------------------------------------


`- userAccountLogs()` <br />
The `userAccountLogs()` method is used to get user account logs

```js
user.userAccountLogs({
 take: '1',
 skip: '0'
});
```

##### Arguments

`select (optional)`: A string that specifies which columns to select in the query. If not provided, all columns will be selected.<br/>
`skip (optional)`: A string that specifies the number of rows to skip in the result set. If not provided, no rows will be skipped.<br/>
`take (optional)`: A string that specifies the maximum number of rows to return in the result set. If not provided, all rows will be returned.<br/>
`order (optional)`: A string that specifies the sorting order for the result set. It can be used to sort data based on one or more columns in ascending or descending order. If not provided, the result set will not be sorted.<br/>
`filter (optional)`: A string that specifies the filter conditions to apply to the result set. It can be used to select rows that meet certain criteria based on the values of one or more columns. If not provided, no filters will be applied.<br/>
`join (optional)`: A string that specifies the join conditions to use when querying data from multiple tables. It can be used to retrieve data from related tables by specifying how the tables are related to each other. If not provided, no joins will be performed.<br/>

Return response on success
```
{
"userAccountLogs": [
    {
      "id": 0,
      "userId": 0,
      "saveDate": "string",
      "bankCode": "string",
      "accountNo": "string",
      "vBankCode": "string",
      "vAccountNo": "string",
      "amount": 0,
      "pendingWithdrawal": 0,
      "pendingInvestment": 0,
      "pendingEtc": 0,
      "createdAt": "2023-03-30T10:55:03.973Z",
      "updatedAt": "2023-03-30T10:55:03.973Z"
    }
  ]
}
```
 --------------------------------------------

`- userNoteLogs()` <br />
The `userNoteLogs()` method is used to get user notes log.

```js
user.userNoteLogs({
 take: '1',
 skip: '0'
});
```

##### Arguments

`select (optional)`: A string that specifies which columns to select in the query. If not provided, all columns will be selected.<br/>
`skip (optional)`: A string that specifies the number of rows to skip in the result set. If not provided, no rows will be skipped.<br/>
`take (optional)`: A string that specifies the maximum number of rows to return in the result set. If not provided, all rows will be returned.<br/>
`order (optional)`: A string that specifies the sorting order for the result set. It can be used to sort data based on one or more columns in ascending or descending order. If not provided, the result set will not be sorted.<br/>
`filter (optional)`: A string that specifies the filter conditions to apply to the result set. It can be used to select rows that meet certain criteria based on the values of one or more columns. If not provided, no filters will be applied.<br/>
`join (optional)`: A string that specifies the join conditions to use when querying data from multiple tables. It can be used to retrieve data from related tables by specifying how the tables are related to each other. If not provided, no joins will be performed.<br/>

Return response on success
```
{
"userNotesLogs": [
    {
       "id": 0,
      "userId": 0,
      "saveDate": "string",
      "noteCount": 0,
      "principal": 0,
      "repaidPrincipal": 0,
      "remainPrincipal": 0,
      "data": {},
      "createdAt": "2023-03-30T10:53:41.936Z",
      "updatedAt": "2023-03-30T10:53:41.936Z"
    }
  ]
}
```
 --------------------------------------------

`- kftcBalance()` <br />
The `kftcBalance()` get how much borrower loan amount.

```js
user.kftcBalance();
```


Return response on success
```
{
    data: {
         "rsp_code": "string",
         "rsp_message": "string",
        "borrower_info": {},
        "in_progress_result_info": {},
        "complete_result_info": {}
    }
}
```
 --------------------------------------------
 `- portfolio()` <br />
The `portfolio()` method is used to get user portfolio data.

```js
user.portfolio({
  enabled: true
});
```

Return a response on success
```
{
    depositsAmount: number;
    notesAmount: number;
    totalAssetsAmount: number;
    totalNotes: number;
    totalExpectedReturn: number;
    returnAfterTax: number;
    actualReturn: number;
    totalTodayInvestment: number;
    totalInvestmentAmount: number;
    totalTodayRepayment: number;
    totalRepaymentAmount: number;
    notes: any[];
}
```
 --------------------------------------------

**Hooks** <br/>
 --------------------------------------------

`- useUserHooks()` <br />
The `useUserHooks()` method is used to return the react-query hooks for myPageData(), userData(), totalAssets() and methods above.

```ts
const {myPageData} = user.useUserHooks();
const {data, isFetching} = myPageData();

```
Return a response with react-query hooks for `myPageData()`, `userData()`, `totalAssets()` and methods above.

`myPageData` - myPageData provides profile overview of the user like repayments, account and investments analysis
`totalAssets` - totalAssets gives overview and data of accounts and money that can be invested/withdrawn