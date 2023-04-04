Loans class
The `Loans` class is a client for interacting with the Kross API's loans-related endpoints. It extends the `KrossClientBase class` and provides methods for checking loans information.

### Table of Contents
 --------------------------------------------

**Constructor** <br/>

**Methods** <br/>
***- loanData()*** <br/>
***- loanRepayments()*** <br/>
***- loanConfigs()*** <br/>
***- loanDetail()*** <br/>

**Hooks** <br/>
***- useLoanHooks()***

**Constructor** <br/>
 --------------------------------------------
The `Loans` class constructor accepts a KrossClientOptions object as its only argument. This object is used to configure the underlying Axios instance that makes the HTTP requests to the Kross API.

```ts
import { Loans } from 'kross-sdk';

const loans = new Loans({
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
loans.loanData({
    filter: 'state||$in||funding,pending',
    skip: '0',
    take: '3',
    order: 'id.desc',
});
```
##### Arguments <br/>
`select (optional)`: A string that specifies which columns to select in the query. If not provided, all columns will be selected.<br/>
`skip (optional)`: A string that specifies the number of rows to skip in the result set. If not provided, no rows will be skipped.<br/>
`take (optional)`: A string that specifies the maximum number of rows to return in the result set. If not provided, all rows will be returned.<br/>
`order (optional)`: A string that specifies the sorting order for the result set. It can be used to sort data based on one or more columns in ascending or descending order. If not provided, the result set will not be sorted.<br/>
`filter (optional)`: A string that specifies the filter conditions to apply to the result set. It can be used to select rows that meet certain criteria based on the values of one or more columns. If not provided, no filters will be applied.<br/>
`join (optional)`: A string that specifies the join conditions to use when querying data from multiple tables. It can be used to retrieve data from related tables by specifying how the tables are related to each other. If not provided, no joins will be performed.<br/>

Return an array of loans in response on success
```
[{
      "id": 0,
      "no": 0,
      "applicationId": "string",
      "userId": 0,
      "name": "string",
      "category": "string",
      "state": "string",
      "isDisplayed": true,
      "paymentDate": "string",
      "dueDate": "string",
      "repaymentDate": "string",
      "period": 0,
      "interestRate": 0,
      "overdueInterestRate": 0,
      "investorFeeRate": 0,
      "borrowerFeeRate": 0,
      "fundAmount": 0,
      "investedAmount": 0,
      "expectedAmount": 0,
      "repaymentAmount": 0,
      "principal": 0,
      "interestAmount": 0,
      "investorFeeAmount": 0,
      "borrowerFeeAmount": 0,
      "taxAmount": 0,
      "repaymentType": "string",
      "repaymentCycle": 0,
      "repaymentCount": 0,
      "wcTid": "string",
      "wcRtid": "string",
      "wcKeepid": "string",
      "kftcLoanRegisterId": "string",
      "kftcLoanContractId": "string",
      "kftcGoodsId": "string",
      "memo": "string",
      "data": {},
      "createdAt": "2023-03-30T08:18:06.059Z",
      "updatedAt": "2023-03-30T08:18:06.059Z",
      "investableLimit": 0
    }]
```
 --------------------------------------------

`- loansRepayments()` <br/>
The `loansRepayments()` method is used to get list of loan repayments.

```ts
loans.loansRepayments({
    filter: 'state||$in||funding',
    skip: '0',
    take: '3',
    order: 'id.desc',
});
```

##### Arguments
`select (optional)`: A string that specifies which columns to select in the query. If not provided, all columns will be selected.<br/>
`skip (optional)`: A string that specifies the number of rows to skip in the result set. If not provided, no rows will be skipped.<br/>
`take (optional)`: A string that specifies the maximum number of rows to return in the result set. If not provided, all rows will be returned.<br/>
`order (optional)`: A string that specifies the sorting order for the result set. It can be used to sort data based on one or more columns in ascending or descending order. If not provided, the result set will not be sorted.<br/>
`filter (optional)`: A string that specifies the filter conditions to apply to the result set. It can be used to select rows that meet certain criteria based on the values of one or more columns. If not provided, no filters will be applied.<br/>
`join (optional)`: A string that specifies the join conditions to use when querying data from multiple tables. It can be used to retrieve data from related tables by specifying how the tables are related to each other. If not provided, no joins will be performed.<br/>

Return an array of repayment in response on success
```
[{
      "id": 0,
      "loanId": 0,
      "seq": 0,
      "state": "string",
      "amount": 0,
      "principal": 0,
      "interest": 0,
      "investorFee": 0,
      "investorFeeVat": 0,
      "borrowerFee": 0,
      "borrowerFeeVat": 0,
      "incomeTax": 0,
      "localTax": 0,
      "data": {},
      "createdAt": "2023-03-30T08:21:04.063Z",
      "updatedAt": "2023-03-30T08:21:04.063Z"
    }]
``` 
 --------------------------------------------

`- loanConfigs()` <br/>
The `loanConfigs()` method is used to get loan configurations.

```ts
loans.loanConfigs({
    filter: 'id||$in||1,2,3',
    skip: '0',
    take: '3',
    order: 'id.desc',
});
```

##### Arguments

`select (optional)`: A string that specifies which columns to select in the query. If not provided, all columns will be selected.<br/>
`skip (optional)`: A string that specifies the number of rows to skip in the result set. If not provided, no rows will be skipped.<br/>
`take (optional)`: A string that specifies the maximum number of rows to return in the result set. If not provided, all rows will be returned.<br/>
`order (optional)`: A string that specifies the sorting order for the result set. It can be used to sort data based on one or more columns in ascending or descending order. If not provided, the result set will not be sorted.<br/>
`filter (optional)`: A string that specifies the filter conditions to apply to the result set. It can be used to select rows that meet certain criteria based on the values of one or more columns. If not provided, no filters will be applied.<br/>
`join (optional)`: A string that specifies the join conditions to use when querying data from multiple tables. It can be used to retrieve data from related tables by specifying how the tables are related to each other. If not provided, no joins will be performed.<br/>

Return an array of loan Configs in response on success
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
 --------------------------------------------

`- loanDetails()` <br/>
The `loanDetails()` method is used to get loan details.

```ts
loans.loanDetails({
    loanDetailId
});
```

##### Arguments

`loanDetailId` - loanDetailId for specfic loan details  <br/>


Return response on success
```
{
  "id": 0,
  "title": "string",
  "content": "string",
  "files": [
    "string"
  ],
  "loan": {},
  "loanApplication": {},
  "createdAt": "2023-03-30T08:31:40.743Z",
  "updatedAt": "2023-03-30T08:31:40.743Z"
}
``` 
 --------------------------------------------

**Hooks** <br/>
 --------------------------------------------

`- useLoanHooks()` <br />
The `useLoanHooks()` method is used to return the react-query hooks for loanData(), loanDetail(), loanPaymentSchedule() and methods above.

```ts
const {loanData} = loans.useLoanHooks();
const {data, isFetching} = loanData({
  skip: '0',
  take: '4'
})
```
Return a response with react-query hooks for `loanData()`, `loanDetail()`, `loanPaymentSchedule()` and methods above.
