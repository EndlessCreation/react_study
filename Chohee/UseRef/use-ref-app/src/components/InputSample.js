import React, { useRef, useState } from 'react'

function InputSample() {
    // Declare useState
    const [inputs, setInputs] = useState({
        name: '',
        nickname: ''
    })
    
    // return 안의 JSX에서 자바스크립트 변수를 사용하기 위함
    const { name , nickname } = inputs

    // useRef를 사용해서 DOM을 가져오기
    const nameInput = useRef()

    const onChange = (e) => {
        const {name, value} = e.target
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const onReset = () => {
        setInputs({
            name: '',
            nickname: ''
        })
        // ref 객체를 사용해서 포커스 설정하기
        nameInput.current.focus();
    }

    return(
        <>
            <input name="name" placeholder="이름을 입력하세용" onChange={onChange} ref={nameInput}/>
            <input name="nickname" placeholder="닉네임을 입력하세용" onChange={onChange}/>
            <button onClick={onReset}>초기화하기!!</button>
            <div>
                <b>당신이 입력한 값은 💁🏼‍♀️</b> <br></br>
                이름 : {name} <br></br>
                닉네임 : {nickname}
            </div>
        </>
    )
}

export default InputSample;