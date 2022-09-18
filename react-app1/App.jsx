import React from "react";
import ReactDom from "react-dom/client";

const App = () => {
    const [counter, setCounter] = React.useState(0);

    return <div>
        <h3>React App1</h3>
        <div>React: {counter}</div>
        <button onClick={() => setCounter(counter + 1)}> + 1</button>
    </div>
}

export default App;
