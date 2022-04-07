For Installing 
yarn add 90days-sign-sdk

OR

npm install 90days-sign-sdk


For Importing 
import {windowPopUp} from '90days-sign-sdk';


For Usage


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
}


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
}

return (
    <button onClick={handleEvent}>Open</button>
)

}