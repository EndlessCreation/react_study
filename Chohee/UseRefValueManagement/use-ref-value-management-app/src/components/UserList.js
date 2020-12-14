import React from 'react';
import User from './User';

function UserList({ users }) {

    return(
        <>
            <div>리액트 스터디원들이 누구누구있겡👩🏻‍💻👨🏻‍💻</div>
            <div>별명두 맞춰바~~!</div>
            {/* 자바스크립트 map() 함수 사용하여 배열 순회(key라는 props도 무조건 전달) */}
            {
                users.map(user =>
                    <User user={user} key={user.id}/>
                )
            }
        </>
    )
}

export default UserList;