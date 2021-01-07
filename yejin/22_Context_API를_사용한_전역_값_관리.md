# 22. Context API를 사용한 전역 값 관리

지금까지의 프로젝트에서 App 컴포넌트에서 onToggle, onRemove 가 구현 되어있고 UserList 컴포넌트를 거쳐 각 User 컴포넌트들에게 전달이 되고 있다.

→ 여기서 UserList 컴포넌트의 경우, onToggle과 onRemove를 전달하기 위한 **중간 다리 역할**만 하고있다.

**UserList.js**

```jsx
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
```

→ 해당 함수들을 직접 사용하지 않음

위와 같이 컴포넌트를 한개만 거쳐서 전달하는 것은 크게 불편하지 않지만, 여러개의 컴포넌트를 거친다면 매우 번거롭다. 

**→ 리액트의 Context API와 dispatch를 함께 사용하면 복잡한 구조 해결!**

## 리액트의 Context API

- 프로젝트 안에서 전역적으로 사용할 수 있는 값(꼭 상태가 아니어도 됨, 함수, 외부 라이브러리 인스턴스, DOM일 수 있음)을 관리할 수 있다.

Context API를 사용하여 새로운 Context를 만드는 방법

- Context를 만들때, **React.createContext() 라**는 함수를 사용

```jsx
const UserDispatch = React.createContext(null);
```

→ createContext의 파라미터에는 **Context의 기본값**을 설정할 수 있다.

- Context를 만들면, **Context 안에 Provider라는 컴포넌트**가 들어있는데 이를 통해 Context의 값을 정할 수 있다. ( 이 컴포넌트를 사용할 때, **value** 라는 값을 설정해주면 된다.)

```jsx
<UserDispatch.Provider value = {dispatch}>...</UserDispatch.Provider>
```

 → Provider에 의해 감싸진 컴포넌트 중 어디서든지 우리가 Context의 값을 다른 곳에서 바로 조회해서 사용 가능 (조회 방법은 나중에)

1. 이제 App 컴포넌트에서 Context를 만들고, 사용하고, 내보내는 작업을 해주기

```jsx
import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './hooks/useInputs';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  users: [
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
  ]
};

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_USER':
      return {
        users: state.users.concat(action.user)
      };
    case 'TOGGLE_USER':
      return {
        users: state.users.map(user =>
          user.id === action.id ? { ...user, active: !user.active } : user
        )
      };
    case 'REMOVE_USER':
      return {
        users: state.users.filter(user => user.id !== action.id)
      };
    default:
      return state;
  }
}

**// UserDispatch 라는 이름으로 내보내준다.
export const UserDispatch = React.createContext(null);**

function App() {
  const [{ username, email }, onChange, reset] = useInputs({
    username: '',
    email: ''
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const { users } = state;

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    reset();
    nextId.current += 1;
  }, [username, email, reset]);

  const onToggle = useCallback(id => {
    dispatch({
      type: 'TOGGLE_USER',
      id
    });
  }, []);

  const onRemove = useCallback(id => {
    dispatch({
      type: 'REMOVE_USER',
      id
    });
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    **<UserDispatch.Provider value = {dispatch}>**
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>활성사용자 수 : {count}</div>
    **</UserDispatch.Provider>**
  );
}

export default App;
```

여기서

```jsx
export const UserDispatch = React.createContext(null);
```

라고 내보내주면 나중에 사용하고 싶을 때, 다음과 같이 불러와서 사용할 수 있다.

```jsx
import { UserDispatch } from './App';
```

2. Context를 다 만들었으면, App에서 onToggle과 onRemove를 지우고, UserList에게 props를 전달하는 것도 지우기

**App.js**

```jsx
import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './hooks/useInputs';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  users: [
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
  ]
};

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_USER':
      return {
        users: state.users.concat(action.user)
      };
    case 'TOGGLE_USER':
      return {
        users: state.users.map(user =>
          user.id === action.id ? { ...user, active: !user.active } : user
        )
      };
    case 'REMOVE_USER':
      return {
        users: state.users.filter(user => user.id !== action.id)
      };
    default:
      return state;
  }
}

// UserDispatch 라는 이름으로 내보내준다.
export const UserDispatch = React.createContext(null);

function App() {
  const [{ username, email }, onChange, reset] = useInputs({
    username: '',
    email: ''
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const { users } = state;

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    reset();
    nextId.current += 1;
  }, [username, email, reset]);

  

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <UserDispatch.Provider value = {dispatch}>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} />
      <div>활성사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;
```

3. 이제 UserList 컴포넌트에서 onToggle과 onRemove와 관련된 코드들을 지워주기

**UserList.js**

```jsx
import React from 'react';

const User = React.memo(function User({ user }) {
  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black'
        }}
        onClick={() => {}}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() =>{} }>삭제</button>
    </div>
  );
});

function UserList({ users }) {
  return (
    <div>
      {users.map(user => (
        <User
          user={user}
          key={user.id}
          
        />
      ))}
    </div>
  );
}

export default React.memo(UserList);
```

4. User 컴포넌트에서 바로 dispatch 사용

- 이를 위해서는 useContext라는 Hook을 사용해서 우리가 만든 UserDispatch Context를 조회해야 한다.

**UserList.js**

```jsx
import React from 'react';
import {UserDispatch} from './App';

const User = React.memo(function User({ user }) {
  
  //UserDispatch Context 조회하는 방법
  const dispatch = useContext(UserDispatch);

  //onClick 함수도 수정하기
  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black'
        }}
        onClick={() => {
          // dispatch로 액션 발생
          dispatch({type : 'TOGGLE_USER', id : user.id});
        }}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() =>{
        // dispatch로 액션 발생
        dispatch({type : 'REMOVE_USER', id : user.id});
      } }>삭제</button>
    </div>
  );
});

function UserList({ users }) {
  return (
    <div>
      {users.map(user => (
        <User
          user={user}
          key={user.id}
          
        />
      ))}
    </div>
  );
}

export default React.memo(UserList);
```

이렇게 Context API를 사용하여 dispatch를 어디서든지 조회해서 사용해줄 수 있게 함