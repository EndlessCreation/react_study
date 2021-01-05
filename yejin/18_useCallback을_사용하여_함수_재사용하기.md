# 18. useCallback 를 사용하여 함수 재사용하기

useCallback은 우리가 지난시간 배운 useMemo와 비슷하다.

useMemo는 특정 결과 값을 재사용하는 반면, **useCallback은 특정 함수를 새로 만들지 않고 재사용**하고 싶을 때 사용한다.

이전의 App.js에서 구현했던 onCreate, onRemove, onToggle 함수에서 useCallback을 사용해보자

- 이전 세 함수들은 컴포넌트가 리렌더링 될 때마다 새로 만들어졌었다.
- 함수를 선언하는 자체가 메모리, CPU, 리소스를 많이 차지 하는 것은 아니지만 한번 만든 함수를 필요할 때만 새로 만들고 재사용하는 것은 중요하다.
- 그 이유는, 나중에 컴포넌트에서 props가 바뀌지 않았으면 Virtual DOM에 새로 렌더링하는 것 초자 하지 않고 컴포넌트의 결과물을 재사용하는 최적화 작업을 할 것인데, 이때 함수 재사용은 필수적이다!

**App.js**

```jsx
import React, { useRef, useState, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const { username, email } = inputs;
  const onChange = useCallback(
     e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }, [inputs]
  );

  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]);

  const nextId = useRef(4);
  const onCreate = useCallback( () => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers(users.concat(user));

    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  },[users, username, email]);

  const onRemove = useCallback (id => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setUsers(users.filter(user => user.id !== id));
  },[users])

  const onToggle = useCallback (id => {
    setUsers(
      users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  }, [users])

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;
```

*** 주의 * 함수 안에서 사용하는 상태 혹은 props가 있다면 꼭, deps 배열안에 포함시켜야 된다.**

만약 deps 배열 안에 함수에서 사용하는 값을 넣지 않게 되면 함수 내에서 해당 값들을 참조할 때 가장 최신 값을 참조할 것이라고 보장할 수 없다.

props로 받아온 함수가 있다면 이또한 deps에 넣어주어야 한다

사실 useCallback은 useMemo를 기반으로 만들어짐.

다만, 함수를 위해서 사용할 때 더욱 편하게 해준 것 뿐이다.

```jsx
const onToggle = useMemo(
  () => () => {
    /* ... */
  },
  [users]
);
```

→ 이런식으로 표현 가능

useCallback으로 눈에띄는 최적화는 없다. 

어떤 컴포넌트가 렌더링 되는지 확인하기 위한 React DevTools !

하이라이트로 설정하고 확인해보면 input에 값을 입력할때도 UserList 컴포넌트가 리렌더링 되는 것을 확인할 수 있다. 다음엔 이 리렌더링을 막는 것을 배울것..!