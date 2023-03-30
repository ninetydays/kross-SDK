Investments class
The `Investments` class is a client for interacting with the Kross API's loans-related endpoints. It extends the `KrossClientBase class` and provides methods for investment registeration, cancellation, notes and getting investment details.

### Table of Contents

**Constructor** <br/>
**Methods** <br/>
***- investmentList()*** <br/>
***- notes()*** <br/>
***- cmsTradebook()*** <br/>
***- investmentRegister()*** <br/>
***- investmentCancel()*** <br/>
**Hooks** <br/>
***- useInvestmentHooks()***

**Constructor** <br/>
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
`filter` - filter for loans. <br/>
`skip, take` : pagination props <br/>
`order`: order lets you sort investments data based on fields <br/>

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

`filter` - filter for notes. <br/>
`skip, take` : pagination props <br/>
`order`: order lets you sort notes data based on fields <br/>

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

`- cmsTradebook()` <br/>
The `cmsTradebook()` method is used to get cms tradebooks data.

```ts
investments.cmsTradebook({
    query: 'id||$in||1,2,3',
    offset: '0',
    limit: '3',
    sort_by: 'id.desc',
});
```

##### Arguments

`query` - query for cmsTradebooks data. <br/>
`offset, limit` : pagination props <br/>
`sort_by`: sort lets you sort cmsTradebooks data based on fields <br/>

Return an array of cmsTradebooks data in response on success
```
[{
      "id": 0,
      "userId": 0,
      "loanCategory": "string",
      "loanName": "string",
      "period": 0,
      "interestRate": 0,
      "investorFeeRate": 0,
      "borrowerFeeRate": 0,
      "repaymentType": "string",
      "repaymentCycle": "string",
      "repaymentCount": 0,
      "path": "string",
      "auditNumber": "string",
      "createdAt": "2023-03-30T08:23:33.251Z",
      "updatedAt": "2023-03-30T08:23:33.251Z"
    }]
``` 

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