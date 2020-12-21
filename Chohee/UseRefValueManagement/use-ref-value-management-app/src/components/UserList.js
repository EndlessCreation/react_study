import React from 'react';
import User from './User';

function UserList({ users, onRemove, onToggle }) {
    

    return(
        <>
            {users.map( user =>
                <User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle}/>
            )}
            
        </>
    )
}

export default UserList;