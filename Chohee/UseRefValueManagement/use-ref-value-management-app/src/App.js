import React, { useRef } from 'react'
import UserList from './components/UserList'

function App() {
  // 1. 유저 목록 생성하기
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

  const nextId = useRef(4);

  const onCreate = () => {
    nextId.current += 1;
  }

  return (
    <>
      {/* 2. 유저 목록을 users라는 props로 자식 컴포넌트에게 전달하기 */}
      <UserList users={users}/>
    </>
  );
}

export default App;
