import React from 'react';
import User from './User';

function UserList() {
    // 1. 유저 목록
    const userList = [
        {
            id: 1,
            username: '김초희',
            nickname: '초밥'
        },
        {
            id: 2,
            username: '김미성',
            nickname: '킴마성'
        },
        {
            id: 3,
            username: '김건훈',
            nickname: '노루참치'
        },
        {
            id: 4,
            username: '조인혁',
            nickname: '오함마'
        },
        {
            id: 5,
            username: '신성일',
            nickname: '로봇'
        }
    ]

    return(
        <>
            <div>리액트 스터디원들이 누구누구있겡👩🏻‍💻👨🏻‍💻</div>
            <div>별명두 맞춰바~~!</div>
            {/* 자바스크립트 map() 함수 사용하여 배열 순회(key라는 props도 무조건 전달) */}
            {
                userList.map(user =>
                    <User user={user} key={user.id}/>
                )
            }
        </>
    )
}

export default UserList;