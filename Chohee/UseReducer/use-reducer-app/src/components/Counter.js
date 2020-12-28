import React, { useReducer, useState } from 'react'

function reducer(state, action) {
    switch(action.type) {
      case 'INCREASE':
        return state + 1;
      case 'DECREASE':
        return state - 1;
      default:
        return state;
    }
}

function Counter() {
    const [number, dispatch] = useReducer(reducer, 0);
    
    // style
    const numberStyle = {
        color: 'red'
    }

    const onIncrease = () => {
        dispatch({
            type: 'INCREASE'
        });
        console.log('+1')
    }
    const onDecrease = () => {
        dispatch({
            type: 'DECREASE'
        });
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