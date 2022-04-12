## For Installing

`yarn add 90days-sign-sdk`

OR

`npm install 90days-sign-sdk`

## For Importing

`import {windowPopUp} from '90days-sign-sdk';`

## For Usage

```js
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
        windowPopUp()
    }

    return <button onClick={handleEvent}>Open</button>
}
```

###### React Demo CodesandBox

[React Demo CodesandBox](https://codesandbox.io/s/kross-sdk-react-test-ij761l).

###### Angular Demo CodesandBox

[Angular Demo CodesandBox](https://codesandbox.io/s/kross-sdk-test-angular-tvvjne).

###### Static Html CodesandBox

[Static HTML CodesandBox](https://codesandbox.io/s/kross-static-html-test-ty72yj).
