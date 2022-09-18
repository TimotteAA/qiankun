import React, { useState } from "react";

function useToggle(initialValue) {
    const [value, setValue] = useState(initialValue);

    return {
        isToggled: value,
        isNotToggled: !value,
        setToggle: setValue
    }
}

const App = () => {
    const { isToggled, setToggle } = useToggle(true);

    return <div>
        <h3>React App2</h3>
        <div>{ isToggled ? "啊啊啊" : "步步" }</div>
        <button onClick={() => setToggle(!isToggled)}>改变</button>
    </div>
}

export default App;
