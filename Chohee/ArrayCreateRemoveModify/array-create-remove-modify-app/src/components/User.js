import React from 'react';

function User({ user }) {
    
    return(
        <div>
            <b>{user.username}</b> 의 닉네임이 뭐겡~!? 🧚🏻‍♀️ <span>{user.nickname}</span> 
        </div>
    )
}

export default User;