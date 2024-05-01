import React, { useState } from 'react'

export default function HookLearning() {
    const[count, setCount] = useState(0);
    var increment = () =>{
        // alert("hi");
        setCount(count + 1)
    }
    var decrement = () =>{
        // alert("hi");
        setCount(count - 1)

    }
  return (
    <div>
        <button onClick={increment}>+</button>
      Value : {count}
      <button onClick={decrement}>-</button>
    </div>
  )
}
