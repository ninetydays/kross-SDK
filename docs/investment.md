Investments class
The `Investments` class is a client for interacting with the Kross API's loans-related endpoints. It extends the `KrossClientBase class` and provides methods for investment registeration, cancellation, notes and getting investment details.

### Table of Contents
 --------------------------------------------


**Constructor** <br/>

**Methods** <br/>
***- investmentList()*** <br/>
***- notes()*** <br/>
***- transactionLogs()*** <br/>
***- investmentRegister()*** <br/>
***- investmentCancel()*** <br/>

**Hooks** <br/>
***- useInvestmentHooks()***

**Constructor** <br/>
 --------------------------------------------

The `Investments` class constructor accepts a KrossClientOptions object as its only argument. This object is used to configure the underlying Axios instance that makes the HTTP requests to the Kross API.

```ts
import { Investments } from 'kross-sdk';

const investments = new Investments({
  baseURL: 'https://api.kross.com',
  accessId: 'afsdfsdfjsdfsd',
  secretKey: 'sdfsdfsdfsdfsdf',
});
```

**Methods** <br/>
 --------------------------------------------

`- loanData()` <br/>
The `loanData()` method is used to get Loans data.

```ts
investments.investmentList({
    filter: 'state||$in||funding,pending',
    skip: '0',
    take: '3',
    order: 'id.desc',
});
```
##### Arguments <br/>
`select (Optional)`: This parameter is used to specify the columns that should be returned in the result set. If not provided, all columns will be selected.

`skip (Optional)`: This parameter is used to skip a certain number of rows in the result set. It can be used to implement pagination or to exclude the first few rows from the result set. If not provided, no rows will be skipped.

`take (Optional)`: This parameter is used to limit the number of rows returned in the result set. It can be used to implement pagination or to restrict the size of the result set. If not provided, all rows will be returned.

`order (Optional)`: This parameter is used to specify the order in which the rows should be returned in the result set. It can be used to sort the rows based on one or more columns, in either ascending or descending order. If not provided, the result set will not be sorted.

`filter (Optional)`: This parameter is used to filter the rows in the result set based on certain criteria. It can be used to select rows that meet specific conditions based on the values of one or more columns. If not provided, no filters will be applied.

`join (Optional)`: This parameter is used to specify the join conditions when querying data from multiple tables. It can be used to retrieve related data from different tables by specifying how the tables are related to each other. If not provided, no joins will be performed.



Return an array of investments in response on success
```
[{
     "id": 0,
      "productId": 0,
      "applicantId": 0,
      "memberId": 0,
      "userId": 0,
      "amount": 0,
      "state": "string",
      "wcTid": "string",
      "kftcInvestmentRegisterId": "string",
      "kftcContractId": "string",
      "data": {},
      "createdAt": "2023-03-30T08:41:46.967Z",
      "updatedAt": "2023-03-30T08:41:46.967Z"
    }]
```
 --------------------------------------------


`- notes()` <br/>
The `notes()` method is used to get list of notes.

```ts
investments.notes({
    filter: 'state||$in||funding',
    skip: '0',
    take: '3',
    order: 'id.desc',
});
```


##### Arguments

`select (Optional)`: This parameter is used to specify the columns that should be returned in the result set. If not provided, all columns will be selected.

`skip (Optional)`: This parameter is used to skip a certain number of rows in the result set. It can be used to implement pagination or to exclude the first few rows from the result set. If not provided, no rows will be skipped.

`take (Optional)`: This parameter is used to limit the number of rows returned in the result set. It can be used to implement pagination or to restrict the size of the result set. If not provided, all rows will be returned.

`order (Optional)`: This parameter is used to specify the order in which the rows should be returned in the result set. It can be used to sort the rows based on one or more columns, in either ascending or descending order. If not provided, the result set will not be sorted.

`filter (Optional)`: This parameter is used to filter the rows in the result set based on certain criteria. It can be used to select rows that meet specific conditions based on the values of one or more columns. If not provided, no filters will be applied.

`join (Optional)`: This parameter is used to specify the join conditions when querying data from multiple tables. It can be used to retrieve related data from different tables by specifying how the tables are related to each other. If not provided, no joins will be performed.

Return an array of notes in response on success
```
[{
      "id": 0,
      "productId": 0,
      "productCode": "string",
      "applicantId": 0,
      "userId": 0,
      "memberId": 0,
      "amount": 0,
      "rate": 0,
      "feeRate": 0,
      "period": 0,
      "startAt": "2023-03-30T08:43:40.942Z",
      "issueAt": "2023-03-30T08:43:40.942Z",
      "returnAt": "2023-03-30T08:43:40.942Z",
      "doneAt": "2023-03-30T08:43:40.942Z",
      "fundAmount": 0,
      "investedAmount": 0,
      "returnedAmount": 0,
      "expectedAmount": 0,
      "feeAmount": 0,
      "taxAmount": 0,
      "escrowAmount": 0,
      "guaranteeId": "string",
      "principal": 0,
      "interest": 0,
      "originPrincipal": 0,
      "state": "string",
      "data": {},
      "createdAt": "2023-03-30T08:43:40.942Z",
      "updatedAt": "2023-03-30T08:43:40.942Z"
    }]
``` 
 --------------------------------------------

`- cmsTradebook()` <br/>
The `cmsTradebook()` method is used to get cms tradebooks data.

```ts
investments.transactionLogs({
    filter: 'id||$in||1,2,3',
    skip: '0',
    take: '3',
    order: 'id.desc',
});
```

##### Arguments

`filter` - query for transactionLogs data. <br/>
`skip, offset` : pagination props <br/>
`order`: sort lets you sort transactionLogs data based on fields <br/>

Return an array of transactionLogs data in response on success
```
[{
      "id": string;
      "category": string;
      "amount": string;
      "balance": string;
      "data": Record<string, unknown>;
      "createdAt": Date;
      "updatedAt": Date;
      "loan": Record<string, unknown> | null;
    }]
``` 
 --------------------------------------------

`- investmentRegister()` <br/>
The `investmentRegister()` method is used to register investments.

```ts
investments.investmentRegister(
    [
        {
            amount: 1000,
            loan_id: 123
        }
    ]
);
```

##### Arguments

 - accepts an array of  {
    amount,
    loan_id
 } for investments registeration <br/>


Return an array of investment registered in response on success
```
[   {
      inv_id
    }
]
``` 
 --------------------------------------------

 `- investmentCancel()` <br/>
The `investmentCancel()` method is used to cancel investments.

```ts
investments.investmentRegister(123);
```

##### Arguments

 - accepts investmentId for investments cancelation <br/>

Return an array of investment registered in response on success
```
{
  data: {
    rsp_code: "string",
    rsp_message: "string"
  },
  okay: true,
  message: "string"
}
``` 
--------------------------------------------

**Hooks** <br/>
 --------------------------------------------

`- useInvestmentHooks()` <br />
The `useInvestmentHooks()` method is used to return the react-query hooks for notes(), investmentList(), transactionHistory(), returnOnInvestments(), appliedInvestments() and methods above.

```ts
const {transactionHistory} = investments.useInvestmentHooks();
const {data, isFetching} = transactionHistory({
    skip: '0',
    take: '1'
})
```
Return a response with react-query hooks for `notes()`, `investmentList()`, `transactionHistory()`, `returnOnInvestments()`, `appliedInvestments()` and methods above.
 --------------------------------------------