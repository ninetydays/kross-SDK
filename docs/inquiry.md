The Inquiries class is a client for interacting with the Kross API's inquiry-related endpoints. It extends the KrossClientBase class and provides methods for creating and fetching inquiries, and responding to inquiries.

### Table of Contents
**Constructor** <br/>

**Methods** <br/>
***- createInquiry()*** <br/>
***- fetchInquiries()*** <br/>
***- respondToInquiry()*** <br/>

**Hooks** <br/>
***- useInquiriesHooks()***

**Constructor** <br/>
The Inquiries class constructor accepts a KrossClientOptions object as its only argument. This object is used to configure the underlying Axios instance that makes the HTTP requests to the Kross API.
```ts
import { Inquiries } from 'kross-sdk';

const inquiries = new Inquiries({
  baseURL: 'https://api.kross.com',
  accessId: 'afsdfsdfjsdfsd',
  secretKey: 'sdfsdfsdfsdfsdf',
});
```
**Methods** <br/>
`- createInquiry()` <br/>
The `createInquiry()` method is used to create a new inquiry.
```ts
inquiries.createInquiry({
  'demo',
  'This is a normal query',
  'pending',
});
```
##### Arguments <br/>
`type` - The type of the inquiry. <br/>
`detail` - The text/content of the inquiry <br />
`state` - state of the query (pending if not responded and done in case if responded). <br/>
`response (optional)` - response content of the inquiry <br/>

Return a response on success

```ts
{
  "id": "string",
  "userId": "string",
  "type": "string",
  "detail": "string",
  "response": "string",
  "createdAt": "2023-03-30T11:53:40.573Z",
  "updatedAt": "2023-03-30T11:53:40.573Z"
}
```
`- fetchInquiries()` <br/>
The `fetchInquiries()` method is used to fetch inquiries.

```ts
inquiries.fetchInquiries({
  skip: '0',
  take: '1'
});
```
##### Arguments <br/>
`select (optional)`: A string that specifies which columns to select in the query. If not provided, all columns will be selected.<br/>
`skip (optional)`: A string that specifies the number of rows to skip in the result set. If not provided, no rows will be skipped.<br/>
`take (optional)`: A string that specifies the maximum number of rows to return in the result set. If not provided, all rows will be returned.<br/>
`order (optional)`: A string that specifies the sorting order for the result set. It can be used to sort data based on one or more columns in ascending or descending order. If not provided, the result set will not be sorted.<br/>
`filter (optional)`: A string that specifies the filter conditions to apply to the result set. It can be used to select rows that meet certain criteria based on the values of one or more columns. If not provided, no filters will be applied.<br/>
`join (optional)`: A string that specifies the join conditions to use when querying data from multiple tables. It can be used to retrieve data from related tables by specifying how the tables are related to each other. If not provided, no joins will be performed.<br/>

Return an array of inquiries in response on success

```css
{
  "inquiry": [
    {
      "id": "string",
      "userId": "string",
      "type": "string",
      "detail": "string",
      "response": "string",
      "createdAt": "2023-03-30T11:54:23.602Z",
      "updatedAt": "2023-03-30T11:54:23.602Z"
    }
  ]
}
```
`- respondToInquiry()` <br />
The `respondToInquiry()` method is used to respond to an inquiry.

```ts
inquiries.respondToInquiry({
  inquiryId,
  response,
  state,
});
```
##### Arguments <br/>
`inquiryId` - The ID of the inquiry to respond to. <br />
`response` - The response content of the inquiry. <br/>
`state` - state of the inquiry needs to be changed to 'done' <br/>

Return a response on success

```css
{
  "id": "string",
  "userId": "string",
  "type": "string",
  "detail": "string",
  "response": "string",
  "createdAt": "2023-03-30T11:57:57.318Z",
  "updatedAt": "2023-03-30T11:57:57.318Z"
}
```

**Hooks** <br/>

`- useInquiriesHooks()` <br />
The `useInquiriesHooks()` method is used to return the react-query hooks for createInquiry(), fetchInquiries() and methods above.

```ts
const {createInquiry} = inquiries.useInquiriesHooks();
const {mutate: createInquiryMutate, status} = createInquiry();
       createInquiryMutate(
            {
              detail: 'This is a normal inquiry',
              type: 'Inquiry Filter',
              state: 'pending',
            },
            {
              onSuccess: () => {
                showToast('문의가 등록되었습니다.', 'green');
                onChangeQueryText('');
              },
              onError: () => {
                showToast('문의 등록에 실패했습니다.', 'red');
              },
            },
          );
```
Return a response with react-query hooks for `createInquiry()`, `fetchInquiries()`, `responseToInquiry()` methods.