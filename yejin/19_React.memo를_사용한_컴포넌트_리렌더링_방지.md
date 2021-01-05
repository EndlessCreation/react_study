# 19. React.memo 를 사용한 컴포넌트 리렌더링 방지

컴포넌트 props 가 바뀌지 않았다면, **리렌더링을 방지하여 리렌더링 성능 최적화**를 해줄 수 있는 **React.memo** 함수에 대해 알아보자!

적용해주기 (input에 값을 입력할 때 다른 항목들은 리렌더링 되지 않도록)

→ 그냥 감싸주면 됨!!

CreateUser.js

```jsx
import React from 'react';

const CreateUser = ({ username, email, onChange, onCreate }) => {
  return (
    <div>
      <input
        name="username"
        placeholder="계정명"
        onChange={onChange}
        value={username}
      />
      <input
        name="email"
        placeholder="이메일"
        onChange={onChange}
        value={email}
      />
      <button onClick={onCreate}>등록</button>
    </div>
  );
};

export default React.memo(CreateUser);
```

UserList와 User 컴포넌트도 적용 시켜주기!

UserList.js

```jsx
import React from 'react';

const User = React.memo(function User({ user, onRemove, onToggle }) {
  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black'
        }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
});

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map(user => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default React.memo(UserList);
```

→ 이렇게 둘다 코딩을 해주면 input을 수정할 때 input 하단의 UserList가 리렌더링이 되지 않는 것을 확인할 수 있다. (근데 새로운 ReactDevTool이 이상한건지 난 여전히 그대로 하이라이트..)

아직 최적화가 끝난 것이 아니다.. User중 하나라도 수정(이름 클릭시 색이 바뀔 때) 하면 모든 User들이 리렌더링 되고, CreateUser도 리렌더링 된다.

→ 이유는 users 배열이 바뀔 때 마다 onCreate도 새로 만들어지고, onToggle, onRemove도 새로 만들어지기 때문

→ **deps에 users가 들어있기 때문에** 배열이 바뀔 때마다 **함수가 새로 만들어지는 것**은 당연.

이걸 최적화하려면?! → **함수형 업데이트!**

### 함수형 업데이트 하기 (함수가 새로 만들어지는 것 방지)

함수형 업데이트를 하게 되면 setUsers에 등록하는 콜백함수의 파라미터에서 최신 users를 참조할 수 있기 때문에 deps에 users를 넣지 않아도 된다.

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
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setInputs(inputs => ({
      ...inputs,
      [name]: value
    }));

  }, []);
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
  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers(users => users.concat(user));

    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  }, [username, email]);

  const onRemove = useCallback(id => {
    // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
    // = user.id 가 id 인 것을 제거함
    setUsers(users => users.filter(user => user.id !== id));
  }, []);
  const onToggle = useCallback(id => {
    setUsers(users =>
      users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
    console.log('색바뀌는 중');
  }, []);
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

→ 이렇게 하면 특정 항목 수정할 때, 해당 항목만 리렌더링 될 것이다. 

근데 나는 또 하이라이팅이 전체로 되길래,, console.log를 찍어봤더니 암튼 잘 되는것 같다..!

그럼 최적화 끝!

---

리액트 개발 시, useCallback, useMemo, React.memo는 컴포넌트의 성능을 실제로 개선할 수 있는 상황에서만 해라

**User 컴포넌트에 b와 button에 onClick으로 설정해준 함수들은, 해당함수를 useCallback 으로 재사용한다고해서 리렌더링을 막을 수 있는 것은 아니여서** 굳이 그렇게 할 필요는 없다.

+ 렌더링 최적화를 하지 않을 컴포넌트에 React.memo를 사용하는 것은 불필요한 props 비교만 하는 것이다.

+ React.memo 에서 두번째 파라미터에 propsAreEqual 이라는 함수를 사용하여 특정 값들만 비교를 하는 것도 가능!

```jsx
export default React.memo (
	UserList,
	(prevProps, nextProps) => prevProps.users === nextProps.users 
);
```

→ 하지만 이것을 잘못사용하면 오히려 의도치 않은 버그 발생이 쉽다.

ex) 함수형 업데이트로 전환을 안했는데 이렇게 users만 비교를 하게 된다면, onToggle과 onRemove에서 최신 users 배열을 참조하지 않으므로 심각한 오류가 발생 할 수 있다.