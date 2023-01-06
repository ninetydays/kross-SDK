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
  secretKey: 'yoursecretkey'
});

const res = await client.get('/loans'); // this is custom axios instance so you can use same options as axios'
```

### frontend SDK

```js
import { windowPopUp } from 'kross-sdk';
const Component = () => {
  const handleEvent = () => {
    /* accepts optional params as {
        url,
        windowFaetures: {
        width,
        height,
        left,
        top
        }
      }
    */
    windowPopUp();
  };

  return <button onClick={handleEvent}>Open</button>;
};
```

###### React Demo CodesandBox

[React Demo CodesandBox](https://codesandbox.io/s/kross-sdk-react-test-ij761l).

###### Angular Demo CodesandBox

[Angular Demo CodesandBox](https://codesandbox.io/s/kross-sdk-test-angular-tvvjne).

###### Static Html CodesandBox

[Static HTML CodesandBox](https://codesandbox.io/s/kross-static-html-test-ty72yj).
