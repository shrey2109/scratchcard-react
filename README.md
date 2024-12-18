# Demo

**Interactive scratch card functionality made simple for your app! ✨**

![enter image description here](https://s7.gifyu.com/images/SPxXQ.gif)

_If a user reveals over 60% of the content and removes their cursor, the remaining portion is automatically revealed, completing the action._

## Installation

Install my-project with npm

```javascript
npm install scratchcard-reactjs
```

## Usage/Examples

```javascript
import { ScratchCard } from "scratchcard-reactjs";
const App = () => {
  return (
    <>
      <ScratchCard
        variant="blue"
        data="YOU WON 5$!!"
        handleCoverScratched={() => {
          console.log("YAY! COVER IS SCRATCHED");
        }}
      />
    </>
  );
};
export default App;
```

## Parameters

| PARAMETER            | DEFAULT                            | DESCRIPTION                                                                                           |
| -------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------- |
| variant              | `"yellow"`                         | 'Specifies the color to be applied to the card. Acceptable values are "yellow", "blue", and "green".' |
| data                 | `"no default value, **required**"` | 'This indicates the text inside the scratch card.'                                                    |
| handleCoverScratched | `"no default value"`               | 'This denotes the function that may be executed once the card is scratched.'                          |

- Feel free to raise Pull Request if you find any bug or any improvement.

## Created By @shrey2109

My name is Shrey Parikh.
LinkedIn: [Click](https://www.linkedin.com/in/shrey-parikh-0547a6227/)
