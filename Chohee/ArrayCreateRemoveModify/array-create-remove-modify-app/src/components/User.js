import React from 'react';

function User({ user, onRemove, onToggle }) {
    const removeStyle = {
        color: 'red',
        border: 'none',
        marginLeft: '20px'
    }

    const userStyle = {
        cursor: 'pointer',
        color: user.active ? 'green' : 'black'
    }
    return(
        <div>
            <b style={userStyle} onClick={() => onToggle(user.id)}>{user.username}</b> 의 닉네임이 뭐겡~!? 🧚🏻‍♀️ <span>{user.nickname}</span> 
            <button style={removeStyle} onClick={() => onRemove(user.id)}>탈주! 😭</button>
        </div>
    )
}

export default User;