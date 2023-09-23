# instant push copy paste all below in one go:

git init
git branch -M main
git add .
git commit -m "amended code"
git push -u origin main

# remove: (for example node_modules)!

.filter((nft: any) => nft.media)

git rm -r --cached node_modules

# Read often!

"ok, thank you. I have no clue what "Props and State" means though."

# ChatGPT:

No problem! Let me explain "Props" and "State" in the context of React, as they are fundamental concepts when building React applications.

Props (Properties):

Props are a way to pass data from a parent component to a child component in React.
They are read-only and cannot be modified by the child component that receives them.
Props are used to customize and configure a component based on the data provided by its parent.
Props are typically defined as attributes on JSX elements when you use a component. For example:
jsx
Copy code
<MyComponent name="John" age={30} />
In this example, name and age are props that are passed to the MyComponent component.

State:

State represents the internal data of a component and can change over time.
Unlike props, which are passed from a parent component, state is managed within the component itself.
State changes trigger re-rendering of the component, updating the user interface.
State is initialized in a component using the useState hook (for functional components) or as a property in a class component's state object.
You can think of state as the data that a component "owns" and can modify.
Here's an example of using state with the useState hook in a functional component:

jsx
Copy code
import React, { useState } from 'react';

function Counter() {
// Initialize state with a default value of 0
const [count, setCount] = useState(0);

// Function to increment the count
const increment = () => {
setCount(count + 1);
};

return (

<div>
<p>Count: {count}</p>
<button onClick={increment}>Increment</button>
</div>
);
}
In this example, the count variable represents the state, and the setCount function is used to update it when the "Increment" button is clicked.

In summary, props are used for passing data from parent to child components, while state is used for managing and updating a component's internal data. Understanding the difference between these two concepts is crucial when building React applications.
