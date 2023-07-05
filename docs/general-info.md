GeneralInfo class
The `GeneralInfo` class is a client for interacting with the Kross API's generalInfo-related public endpoints. It extends the `KrossClientBase class` and provides methods for checking loans information.

### Table of Contents
 --------------------------------------------

**Constructor** <br/>

**Methods** <br/>
***- docTerms()*** <br/>
***- articles()*** <br/>

**Hooks** <br/>
***- useGeneralInfo()***

**Constructor** <br/>
 --------------------------------------------
The `GeneralInfo` class constructor accepts a KrossClientOptions object related to generalInfo public data. This object is used to configure the underlying Axios instance that makes the HTTP requests to the Kross API.

```ts
import { GeneralInfo } from 'kross-sdk';

const loans = new GeneralInfo({
  baseURL: 'https://api.kross.com',
  accessId: 'afsdfsdfjsdfsd',
  secretKey: 'sdfsdfsdfsdfsdf',
});
```

**Methods** <br/>
 --------------------------------------------
`- docTerms()` <br/>
The `docTerms()` method gets terms data.

```ts
docTerms({
    filter: 'filter the query to get only certain data',
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

Return an array of response on success
```
[{
    "id": "string",
    "version": "string",
    "type": "string",
    "subject": "string",
    "contents": "string",
    "createdAt": "2023-07-04T04:08:35.598Z",
    "updatedAt": "2023-07-04T04:08:35.598Z"
    }]
```
 --------------------------------------------

`- articles()` <br/>
The `articles()` method gets list of articles

```ts
articles({
    filter: 'filter the query to get only certain data',
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
    "id":	"number",
    "title": "string",
    "content": "string",
    "files":	"string[]",
    "type": "string",
    "status":	"string".
    }]
``` 
 --------------------------------------------