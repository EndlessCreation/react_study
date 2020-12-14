import React from 'react';

function User({ user }) {
    const nicknameStyle = {
        color: 'darkblue'
    }
    
    // UserList.js와 User.js로 컴포넌트 분리
    return(
        <>
            <div>
                <b>{user.username}</b> 의 닉네임 알어? <b style={nicknameStyle}>{user.nickname}</b>
            </div>
        </>
    )
}

export default User;