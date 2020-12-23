import React, {useState, useRef } from 'react';

function InputSample() {
    const [inputs, setInputs] = useState( {
        value:0,
        name:'',
        nickName:''
    });
    const nameInput = useRef();

    const {value, name, nickName} = inputs;
    const onChange = (e) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs, [name] : value
        });
    };
    const onReset = () => {
        setInputs({
            value:0,
            name:'',
            nickName:''
        })
        nameInput.current.focus();
    };

    return (
        <div>
            <input name="value" onChange={onChange} placeholder="값" 
                value={value} ref={nameInput}></input>
            <input name="name" onChange={onChange} placeholder="이름" value={name} />
            <input name="nickName" onChange={onChange} placeholder="닉네임" value={nickName}/>
            <button onClick={onReset}>초기화</button>
       
            <div>
                값 : {value} <br></br>
                이름 : {name} <br></br>
                닉네임 : {nickName}
            </div>
        </div>
    )
}

export default InputSample;