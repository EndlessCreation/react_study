# 20. useReducer 를 사용하여 상태 업데이트 로직 분리하기

상태를 관리하는 방법에 useState 말고 다른 방법이 있다. useReducer를 사용하는 방법이다.
이 Hook 함수를 사용하면 **컴포넌트의 상태 업데이트 로직을 컴포넌트에서 분리**시킬 수 있다!
상태 업데이트 로직을 컴포넌트 바깥 혹은 다른 파일에 작성 후 불러와서 사용할 수도 있다.

<br>

## useReducer

reducer 함수는 현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수이다.

```javascript
function reducer(state, action) {
  //새로운 상태를 만드는 로직
  // const nextstate =  ...
  return nextstate;
}
```

- 반환하는 nextState는 컴포넌트의 새로운 상태이다
- 여기서 action은 업데이트를 위한 정보를 가지고 있다. 주로 type 값을 지닌 객체 형태로 사용하지만 꼭 따라야 할 규칙은 없다.
- **액션의 예시**

```javascript
{ //카운터에 1을 더하는 액션
	type : 'INCREMENT'
}
{ // 카운터에 1을 빼는 액션
	type : 'DECREMENT'
}
{ //input 값을 바꾸는 액션
	type : "CHANGE_INPUT",
	key : 'email',
	value : ' tester@re.com',
}
{ // 새 할일을 등록하는 액션
	type : 'ADD_TODO',
	todo : {
		id : 1,
		text : 'useReduce 배우기',
		done : false,
	}
}
```

위처럼 action 객체의 형태는 자유이다. type 값을 대문자와 \_로 구성하는 관습이 존재하기도 하지만 꼭 따라야 할 필요는 없다

useReducer 사용법

```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

- 여기서 state는 앞으로 컴포넌트에서 사용 할 수 있는 상태를 가리키게 되고,
- dispatch는 액션을 발생시키는 함수이다.

```javascript
dispatch({ type: "INCREMENT" });
```

dispatch 함수는 위처럼 사용한다

- `useReducer`에 넣는 첫 번째 파라미터는 reducer 함수이고 두 번째 파라미터는 초기 상태이다.
- useReducer을 Counter.js에 적용시키면

```javascript
import React, { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}
function Counter() {
  const [number, dispatch] = useReducer(reducer, 0);

  const onIncrease = () => {
    dispatch({ type: "INCREMENT" });
  };
  const onDecrease = () => {
    dispatch({ type: "DECREMENT" });
  };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
```

reducer 함수에다가 switch 문을 적용시키면 쉽게 구현할 수 있다.
<br>
<br>

## App컴포넌트를 useReducer로 구현하기

```javascript
import React, { useRef, useReducer, useMemo, useCallback } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는중...");
  return users.filter((user) => user.active).length;
}

const initialState = {
  inputs: {
    username: "",
    email: "",
  },
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
    case "CHANGE_INPUT":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value,
        },
      };
    case "CREATE_USER":
      return {
        inputs: initialState.inputs,
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

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;
  const { username, email } = state.inputs;
  const nextId = useRef(4);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_INPUT",
      name,
      value,
    });
  }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    nextId.current += 1;
  }, [username, email]);
  const onToggle = useCallback((id) => {
    dispatch({
      type: "TOGGLE_USER",
      id,
    });
  }, []);
  const onRemove = useCallback((id) => {
    dispatch({
      type: "REMOVE_USER",
      id,
    });
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
      <div>활성 사용자 수 : {count}</div>
    </>
  );
}

export default App;
```
