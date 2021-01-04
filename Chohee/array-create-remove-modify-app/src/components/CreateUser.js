import React, { useCallback, useContext, useRef } from 'react';
import useNewUserInput from '../hooks/useNewUserInput';
import { UserDispatch } from '../App';

function CreateUser() {
    const [{ username, nickname }, onChange, reset] = useNewUserInput({
        username: '',
        nickname: ''
    });

    const nextId = useRef(6);

    const dispatch = useContext(UserDispatch);
    const onCreate = useCallback(() => {
        dispatch({
          type: 'CREATE_USER',
          user: {
            id: nextId.current,
            username,
            nickname
          }
        });
        
        reset();
        nextId.current += 1;
    },
    [username, nickname, reset]);

    return(
        <div>
            <input name="username" placeholder="이름을 입력하세요~" onChange={onChange} value={username}/>
            <input name="nickname" placeholder="별명을 입력하세요~" onChange={onChange} value={nickname}/>
            <button onClick={onCreate}>새로운 스터디원 등록! ✅</button>
        </div>
    )
}

export default React.memo(CreateUser);