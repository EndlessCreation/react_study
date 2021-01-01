import React, { createContext, useContext, useState } from "react";

const MyContext = createContext("defaultValue");

function Child() {
  const text = useContext(MyContext);
  return <div>안녕하세여 {text}</div>;
}
function Parent({ text }) {
  return <Child text={text} />;
}
function GrandParent({ text }) {
  return <Parent text={text} />;
}
function ContextSample() {
  const [value, setvalue] = useState(true);
  return (
    <MyContext.Provider value={value ? "Good" : "bad "}>
      <GrandParent text="GOOD" />
      <button onClick={() => setvalue(!value)}>CLICK</button>
    </MyContext.Provider>
  );
}

export default ContextSample;
