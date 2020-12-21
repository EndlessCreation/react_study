import React from 'react';
import User from './User';

function UserList({ users, onRemove, onToggle }) {
    return(
        <div>
            {/* 자바스크립트 배열 내장함수인 map() 함수 사용하여 배열의 원소 순회(key라는 props도 무조건 전달) */}
            {users.map((user, index) =>
                <User user={user} key={index} onRemove={onRemove} onToggle={onToggle}/>
            )}
        </div>
    )
}

export default UserList;