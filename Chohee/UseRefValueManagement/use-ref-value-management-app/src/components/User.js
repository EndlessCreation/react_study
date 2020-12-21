import React from 'react';

function User({ user, onRemove, onToggle }) {
    const userStyle = {
        cursor: 'pointer',
        color: user.active ? 'green' : 'black'
    }

    const removeStyle = {
        color: "red",
        marginLeft: "16px",
        border: "none"
    }

    return(
        <div>
            <b style={userStyle} onClick={() => onToggle(user.id)}>{user.username}</b> 의 별명은 뭐게? <b>{user.nickname}</b> 👍🏻 
            <button onClick={() => onRemove(user.id)} style={removeStyle}> 삭제하기 🗑</button>
        </div>
    )
}

export default User;