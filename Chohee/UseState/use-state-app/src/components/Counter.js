import React, { useState } from 'react'

function Counter() {
    // Set useState
    const [number, setNumber] = useState(0)

    // style
    const numberStyle = {
        color: 'red'
    }

    // button clink event
    const onIncrease = () => {
        setNumber(number + 1)
        console.log('+1')
    }
    const onDecrease = () => {
        setNumber(number - 1)
        console.log('-1')
    }

    return(
        <>
            <div>
                <h1>자, 당신 숫자의 결과는 ⁉️⁉️⁉️ 두구두구두구~~~~</h1>
                <h1 style={numberStyle}>{number}</h1>
                <button onClick={onIncrease}>1 증가 버튼</button>
                <button onClick={onDecrease}>1 감소 버튼</button>
            </div>
        </>
    )
}

export default Counter;