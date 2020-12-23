import React, {useRef, useState, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import Test from './test';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는 중...');
  return users.filter(user => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username:'',
    email:''
  });
  const {username, email} = inputs;
  const onChange = useCallback(
    e => {
      const {name, value} = e.target;
      setInputs({
      ...inputs,
      [name] : value
      });
    },
    [inputs]
  );
  const [users, setUsers] = useState([
      {
        id: 1,
        username: 'velopert',
        email: 'public.velopert@gmail.com',
        active: true,
      },
      {
        id: 2,
        username: 'tester',
        email: 'tester@example.com',
        active:true,
      },
      {
        id: 3,
        username: 'liz',
        email: 'liz@example.com',
        active:true,
      }
  ]);

  const nextId = useRef(4);
  const onCreate = useCallback(() => {
    const user = {
      id : nextId.current,
      username,
      email
    };
    setUsers(users.concat(user));
    setInputs({
      username:' ',
      email:''
    });
    nextId.current += 1;
  }, [users, username, email]);


  const onRemove = useCallback(
        id => {
        setUsers(users.filter(user => user.id !== id));
    }, [users]
  );

  const onToggle = useCallback(
      id => {
      setUsers(
        users.map(user=>
          user.id === id ? { ...user, active: !user.active } : user)
      );
    }, [users]
    );

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <Test />
      <br />
      <CreateUser  
       username={username}
       email={email}
       onChange={onChange}
       onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
      <div> 활성 사용자 수 : {count}</div>
    </>
  );
}

export default App;