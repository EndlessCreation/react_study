import React from 'react';

function CreateUser({ username, nickname, onChange, onCreate }) {
    return(
        <div>
            <input name="username" placeholder="이름을 입력하세요!" onChange={onChange} value={username}/>
            <input name="nickname" placeholder="닉네임을 입력하세요!" onChange={onChange} value={nickname}/>
            <button onClick={onCreate}>새로운 스터디원 등록하기!</button>
        </div>
    )
}

export default CreateUser;