import React, { useContext } from 'react';
import { UserDispatch } from '../App';

function User({ user }) {
    const dispatch = useContext(UserDispatch);

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
            <b style={userStyle} onClick={() => dispatch({ type: 'TOGGLE_USER', id: user.id })}>{user.username}</b> 의 닉네임이 뭐겡~!? 🧚🏻‍♀️ <span>{user.nickname}</span> 
            <button style={removeStyle} onClick={() => dispatch({ type: 'REMOVE_USER', id: user.id })}>탈주! 😭</button>
        </div>
    )
}

export default React.memo(User);