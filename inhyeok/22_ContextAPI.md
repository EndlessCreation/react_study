# 22. Context API 를 사용한 전역 값 관리

- 현재 만들고 있는 프로젝트에서는 App 컴포넌트에 onToggle과 onRemove가 구현돼있고 이 함수들은 UserList 컴포넌트-> 각 User 컴포넌트로 전달이 된다.
- 여기서 UserList는 중간 다리 역할만 수행하고 있음.
- 나중에 3~4개 이상의 컴포넌트를 거쳐서 전달해야 하는 경우 매우 번거로울 것이다.
- 이럴떈 Context API와 dispatch를 함께 사용하면 복잡한 구조를 해결할 수 있다.
  <br>

---

Context를 만들때는 React.createContext() 라는 함수를 이용한다

```javascript
const UserDispatch = React.createContext(null);
```

- createContext의 파라미터에는 Context의 기본값을 설정할 수 있다.
- Context안에 Provider 라는 컴포넌트가 들어있는데 이 컴포넌트를 통하여 Context의 값을 정할 수 있다.

```javascript
<UserDispatch.Provdier value={dispatch}>...</UserDispatch.Provider>;
export const UserDispatch = React.createContext(null);
```

- 이 값을 다른 곳에서 사용하려면

```javascript
import {userContext} from 'react';
...
const dispatch = useContext(UserDispatch);
```

이렇게 조회하면 dispatch를 사용할 수 있다.
이제 App.js에 적용시켜 보자.

- **App.js**

```javascript
import React, { useRef, useReducer, useMemo, useCallback } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import useInputs from "./hooks/useInputs";

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는중...");
  return users.filter((user) => user.active).length;
}

const initialState = {
  users: [
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
      active: false,
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
      active: false,
    },
  ],
};
function reducer(state, action) {
  switch (action.type) {
    case "CREATE_USER":
      return {
        users: state.users.concat(action.user),
      };
    case "TOGGLE_USER":
      return {
        ...state,
        users: state.users.map((users) =>
          users.id === action.id ? { ...users, active: !users.active } : users
        ),
      };
    case "REMOVE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      return state;
  }
}
export const UserDispatch = React.createContext(null);

function App() {
  const [{ username, email }, onChange, reset] = useInputs({
    username: "",
    email: "",
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;
  const nextId = useRef(4);
  //onchage 함수 삭제
  const onCreate = useCallback(() => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    reset();
    nextId.current += 1;
  }, [username, email]);

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} />
      <div>활성 사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;
```

```javascript
export const UserDispatch = React.createContext(null);
```

- `UserDispatch`을 export 해서 다른 곳에서 사용 가능하게 함

```javascript
return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} />
      <div>활성 사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );
}
```

- UserList에 props로 보내는 onToggle이나 onRemove를 삭제, 컴포넌트를 UserDispatch.Provider로 감싸줌.

## 숙제

User 컴포넌트에게 따로 `onToggle`/ `onRemove` 를 props로 전달하지 않고 바로 `dispatch`를 사용했던 것 처럼 CreateUser 컴포넌트에도 `dispatch`를 직접 하도록 구현하자

- CreateUser에게는 어떤 props도 전달하지 않는다.
- CreateUser 컴포넌트 내부에서 useInputs를 사용하기
- useRef를 사용한 nextId 값을 CreateUser에서 관리하기.

<br>

- **CreateUser.js**

```javascript
import React, { useRef, useContext, useCallback } from "react";
import useInputs from "./hooks/useInputs";
import { UserDispatch } from "./App";

function CreateUser() {
  const [{ username, email }, onChange, reset] = useInputs({
    username: "",
    email: "",
  });
  const dispatch = useContext(UserDispatch);
  const nextId = useRef(4);
  const onCreate = useCallback(() => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    reset();
    nextId.current += 1;
  }, [username, email, reset, dispatch]);
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
}
export default React.memo(CreateUser);
```

- **App.js**

```javascript
...
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;
  //onchage 함수 삭제

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser />
      <UserList users={users} />
      <div>활성 사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );
}
...
```
