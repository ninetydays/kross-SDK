For Installing
yarn add 90days-sign-sdk

OR

npm install 90days-sign-sdk

For Importing
import {windowPopUp} from '90days-sign-sdk';

For Usage
const Component = () => {

const handleEvent = () => {
/_ accepts optional params as {
url,
windowFaetures: {
width,
height,
left,
top
}
}
_/
windowPopUp();
}

return (
<button onClick={handleEvent}>Open</button>
)

}

React CodesandBox
https://codesandbox.io/s/kross-sdk-react-test-ij761l
