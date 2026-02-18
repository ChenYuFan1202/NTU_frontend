import React, { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  }
  useEffect(() => {
    if (count === 10) {
        alert("You clicked 10 times");
        setCount(0);
    }
  }, [count]);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={increment}>Click me</button>
    </div>
  );
}
export default Counter;