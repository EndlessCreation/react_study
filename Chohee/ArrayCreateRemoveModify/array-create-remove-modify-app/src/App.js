import React, { useMemo, useRef, useState } from 'react'
import CreateUser from './components/CreateUser';
import UserList from './components/UserList'

function App() {
  const [newUserInputs, setNewUserInputs] = useState({
    username: '',
    nickname: ''
  });
  const {username, nickname} = newUserInputs;

  const onChange = (e) => {
    const {name, value} = e.target; 
    setNewUserInputs({
      ...newUserInputs,
      [name] : value
    })
  }

  const [users, setUsers] = useState([
    {
        id: 1,
        username: '김초희',
        nickname: '초밥',
        active: true
    },
    {
        id: 2,
        username: '김미성',
        nickname: '킴마성',
        active: true
    },
    {
        id: 3,
        username: '김건훈',
        nickname: '노루참치',
        active: false
    },
    {
        id: 4,
        username: '조인혁',
        nickname: '오함마',
        active: true
    },
    {
        id: 5,
        username: '신성일',
        nickname: '로봇',
        active: false
    }
  ])

  const nextId = useRef(6);
  const onCreate = () => {
    const newUser = {
      id: nextId.current,
      username,
      nickname,
      active: false
    }
    setUsers(
      users.concat(newUser)
    )

    setNewUserInputs({
      username: '',
      nickname: ''
    })
    nextId.current += 1
  }

  const onRemove = id => {
    setUsers(users.filter(user => user.id !== id))
  }

  const onToggle = (id) => {
    setUsers(
      users.map(user => 
        user.id === id ? {...user, active: !user.active } : user
      )
    )
  }

  const activeUserCounts = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <div>리액트 스터디원들이 누구누구있겡👩🏻‍💻👨🏻‍💻</div>
      <div>별명두 맞춰바~~!</div>
      <CreateUser username={username} nickname={nickname} onChange={onChange} onCreate={onCreate}/>
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
      <div>스터디에 활발히 참여하고 있는 사람 수는?: <b>{activeUserCounts}</b> 명!</div>
    </>
  );
}

function countActiveUsers(users) {
  console.log('활성 사용자 수 세는 중..');
  return users.filter(user => user.active === true).length;
}

export default App;