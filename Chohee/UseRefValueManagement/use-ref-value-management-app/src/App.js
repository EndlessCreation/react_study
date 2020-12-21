import React, { useRef, useState } from 'react';
import CreateUser from './components/CreateUser';
import UserList from './components/UserList';

function App() {
  const [createUserInputs, setCreateUserInputs] = useState(
    {
      username: '',
      nickname: ''
    }
  );

  // JSX 와 코드에서 사용하기 위해 각각 변수로 추출
  const { username, nickname } = createUserInputs;

  // users 배열을 useState() 로 관리하기
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
        active: false
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
        active: false
    },
    {
        id: 5,
        username: '신성일',
        nickname: '로봇',
        active: false
    }
])

// Input 입력에 따른 onChange 함수
const onChange = (e) => {
  const { name, value } = e.target;
  setCreateUserInputs({
    ...createUserInputs,
    [name]: value
  });
}

// useRef() 사용해서 nextId 라는 변수 만들기
const nextId = useRef(4);

const onCreate = () => {
  const newUser = {
    id: nextId.current,
    username,
    nickname
  };
  setUsers([
    ...users,
    newUser
  ])

  // Input에 사용되는 변수들 초기화(이거 없으면 create 버튼 눌렀을 때, input 값들이 그대로 남아있게 되어 사용자들에게 UX 적으로 이상한 경험 줄 수 있음)
  setCreateUserInputs({
    username: '',
    nickname: ''
  })

  nextId.current += 1;
}

const onRemove = (id) => {
  // filter() 함수를 사용하여 조건에 맞는 원소로만 새로운 배열을 만듬
  setUsers(users.filter(user => user.id !== id))
}

const onToggle = (id) => {
  setUsers(
    users.map(user => 
      user.id === id ? {... user, active: !user.active } : user
    )
  )
}

  return (
    <>
      {/* 새로운 멤버 추가하는 컴포넌트 */}
      <CreateUser username={username} nickname={nickname} onChange={onChange} onCreate={onCreate}/>

      {/* users 배열을 UserList의 props로 전달하기 */}
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
    </>
  );
}

export default App;
