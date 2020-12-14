import React, { useState } from 'react'

function InputSample() {
    // 1. useState
    const [inputs, setInputs] = useState({
        name: '',
        nickName: ''
    })

    // 2. 비구조화 할당을 통해 useState가 관리하는 객체의 값을 추출 --> JSX 안에서 하나의 객체 안의 데이터(name과 nickName)를 따로 따로 사용할 수 있도록 하기 위함
    const { name, nickName } = inputs

    // 4. onChange 이벤트가 발생하면 호출할 함수 작성하기
    const onChange = (e) => {
        // e.target으로 input 속성 중 name속성과 value속성을 추출하기
        const { name, value } = e.target

        // 객체 업데이트
        setInputs({
            ...inputs, // 기존 객체를 복사한 후,
            [name]: value // name 키를 가진 값에 value를 설정하여 업데이트하기
        })
    }

    const onReset = () => {
        setInputs({
            name: '',
            nickName: ''
        })
    }

    return(
        <>
            {/* 3. input 태그에 name, value 속성 설정하기 */}
            {/* onChange 이벤트가 발생하면 value 속성값에 사용자 입력 값이 저장됨 */}
            <input name="name" onChange={onChange} placeholder="이름을 입력하세용" value={name}/>
            <input name="nickName" onChange={onChange} placeholder="닉네임을 입력하세용" value={nickName}/>
            <button onClick={onReset}>초기화하기!</button>
            <div>
                <b>값 : </b>
                {name} ({nickName})
            </div>
        </>
    )
}

export default InputSample