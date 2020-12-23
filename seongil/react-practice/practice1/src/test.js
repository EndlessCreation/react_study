import React, {useState, useRef} from 'react';

function Temp({temp}) {
    return (
        <div>
            <b>{temp.username}</b> <span> ({temp.email}) </span>
        </div>
    )
}

function Test() {
    const temps = [
        {
            id:1,
            username:'shin',
            email:'gpfqpsxj75@naver.com'
        },
        {
            id:2,
            username:'park',
            email:'dpfnrls@naver.com'
        },
    ];
    const [inputs, setText] = useState({
         name:'', email:''
    });
    const nameInput = useRef();
    const {name, email} = inputs;
    const onChange = (e) =>{
        const { value, name } = e.target;
        setText({
            ...inputs, [name]:value
        });
    }
    const onInit = () => {
        setText({
            name:' ', email:'' 
        });
        nameInput.current.focus();
    }
    return (
        <div>
            <div>
                <br></br>
                <input name='name' onChange={onChange} placeholder="이름" value={name}
                         ref={nameInput} />
                <input name='email' onChange={onChange} placeholder="이메일" value={email} />
                <div>
                    이름 : {name} <br />
                    이메일 : {email} <br/>
                </div>
                <button onClick={onInit}>초기화</button>
                <hr />
                <div>
                    {
                        temps.map(temp => (
                            <Temp temp={temp} key={temps.id}/>
                        ))
                    }
                </div>
            </div>
           <div>
               ______________________________________________
           </div>

        </div>
    ); 
}

export default Test;