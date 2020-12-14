import React from 'react';

function User({ user }) {
    // UserList.js와 User.js로 컴포넌트 분리
    return(
        <>
            <div>
                <b>{user.username}</b> 의 닉네임 알어? <span>{user.nickname}</span>
            </div>
        </>
    )
}

export default User;