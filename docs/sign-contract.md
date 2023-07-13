SignContract class
The `SignContract` class is a client for interacting with the Kross API's sign-contract related public endpoints. It extends the `KrossClientBase class` and provides methods for signing contract for two parties when they sell notes, or signing loans etc.

### Table of Contents
 --------------------------------------------

**Constructor** <br/>

**Methods** <br/>
***- getContractSign()*** <br/>
***- getContractDocument()*** <br/>
***- signContractVerification()*** <br/>

**Hooks** <br/>
***- useSignContracts()***

**Constructor** <br/>
 --------------------------------------------
The `SignContreact` class constructor accepts a KrossClientOptions object related to signing contract when selling notes, etc for two parties when they exchange assets. This object is used to configure the underlying Axios instance that makes the HTTP requests to the Kross API.

```ts
import { SignContract } from 'kross-sdk';

const loans = new SignContract({
  baseURL: 'https://api.kross.com',
  accessId: 'afsdfsdfjsdfsd',
  secretKey: 'sdfsdfsdfsdfsdf',
});
```

**Methods** <br/>
 --------------------------------------------
`- getContractSign()` <br/>
The `getContractSign()` method gets data related to contract detail for parties when they are going to exchange assets.

```ts
getContractSign({
    id: number;
});
```
##### Arguments <br/>
`id (required)`: id to get contract details
<br/>

Return an array of response on success
```
[{
  id: string;
  userId: string;
  type: string;
  target: string;
  targetId: string;
  state: string;
  verificationCode: string;
  messageId: string,
  apiKey: string;
  createdAt: Date;
  updatedAt: Date;
  }]
```
 --------------------------------------------

`- getContractDocument()` <br/>
The `getContractDocument()` method get that will return pdf document.

```ts
getContractDocument({
    document_id: number;
});
```

##### Arguments
`document_id (required)`: We pass the contract_id we get from getContractSign to render actual contract two parties are going to sign. 
<br/>

Return an arrayBuffer which we will display it as pdf document,
```
[{
  data: arrayBuffer
}]
``` 
 --------------------------------------------

 `- signContractVerification()` <br/>
The `signContractVerification()` method put to verify the contract

```ts
signContractVerification({
  id: number;
  verificationCode: string;
});
```

##### Arguments
`id (required)`: id of the contract data
`verificationCode (required)`: verify the contract after they have seen the details of the contract and checked the required fields.
<br/>

Return an array of response on success
```
[{
  id: string;
  userId: string;
  type: string;
  target: string;
  targetId: string;
  state: string;
  verificationCode: string;
  messageId: string,
  apiKey: string;
  createdAt: Date;
  updatedAt: Date;
  }]
```
 --------------------------------------------