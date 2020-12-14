import React, { useState } from 'react'
 
function InputSample() {
    // Manage text value using useState Hooks
    const [text, setText] = useState('')

    // Implement input change function
    const onChange = (e) => {
        // Use event object e for pointing inputDOM
        setText(e.target.value)
    }

    // Implement input reset function
    const onReset = () => {
        // 빈배열로 업데이트
        setText('')
    }

    return(
        <>
            <input placeholder="무엇이든 입력하세요! 자동으로 반영됩니당" onChange={onChange}/>
            <button onClick={onReset}>초기화하기</button>
            <div>
                <b>값 : {text}</b>
            </div>
        </>
    )
}

export default InputSample