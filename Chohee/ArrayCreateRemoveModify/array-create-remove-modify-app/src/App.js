import React, { useRef } from 'react'
import UserList from './components/UserList'

function App() {
  // User 목록 (=배열 렌더링에 필요한 데이터)
  const users = [
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

  // nextId 라는 변수를 useRef()로 생성함.
  const nextId = useRef(6);

  return (
    <>
      <div>리액트 스터디원들이 누구누구있겡👩🏻‍💻👨🏻‍💻</div>
      <div>별명두 맞춰바~~!</div>

      {/* 배열 렌더링 컴포넌트 추가 */}
      <UserList users={users}/>
    </>
  );
}

export default App;
