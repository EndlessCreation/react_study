# 20. useReducer를 사용하여 상태 업데이트 로직 분리하기

### useReducer 이해하기

- 우리가 이전에 만든 사용자 리스트 기능에서의 주요 상태 업데이트 로직은 주로 App 컴포넌트 내부에서 이루어졌음. 상태를 업데이트 할 때는 주로 useState를 사용해 새로운 상태를 설정해 주었었음.
- 하지만 또다른 방법인 useReducer를 사용하는 방법도 있음.
- **useReducer : 컴포넌트의 상태 업데이트 로직을 컴포넌트에서 분리시킬 수 있고 상태 업데이트 로직을 컴포넌트 바깥에 작성할 수도 있고, 심지어 다른 파일에 작성 후 불러와서 사용 가능**

일단 useState를 사용해 만들었던 Counter.js를 살펴보자

**Counter.js** (이전의)

```jsx
import React, { useState } from 'react';

function Counter() {
  const [number, setNumber] = useState(0);

  const onIncrease = () => {
    setNumber(prevNumber => prevNumber + 1);
  };

  const onDecrease = () => {
    setNumber(prevNumber => prevNumber - 1);
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

## Counter 컴포넌트에서 useReducer를 사용해보기

1. **reducer**란 ?

    현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수

    ```jsx
    functin reducer(state, action) {
    	// 새로운 상태를 만드는 로직
    	// const nextState = ...
    }
    ```

    → reducer에서 반환하는 상태 = 컴포넌트가 지닐 새로운 상태

    → action = 업데이트를 위한 정보를 가지고 있음, 주로 type 값을 지닌 객체 형태로 사용하지만, 꼭 따라야 할 규칙은 ㄴㄴ

    액션의 예시!

    ```jsx
    // 카운터에 1을 더하는 액션
    {
      type: 'INCREMENT'
    }
    // 카운터에 1을 빼는 액션
    {
      type: 'DECREMENT'
    }
    // input 값을 바꾸는 액션
    {
      type: 'CHANGE_INPUT',
      key: 'email',
      value: 'tester@react.com'
    }
    // 새 할 일을 등록하는 액션
    {
      type: 'ADD_TODO',
      todo: {
        id: 1,
        text: 'useReducer 배우기',
        done: false,
      }
    }
    ```

    → action 객체의 형태는 자유! (type값을 대문자와 _로 구성하는 관습이 존재하기도 함)

2. **useReducer** 사용법

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

→ state : 앞으로 컴포넌트에서 사용할 수 있는 상태

→ dispatch : 액션을 발생시키는 함수 ex) dispatch({ type : 'INCREMENT' })

→ reducer : reducer 함수

→ initialState : 초기 상태

3. 해보기

 **Counter.js**

```jsx
import React, {useReducer} from 'react';

function reducer(state, action) {
    switch (action.type) {
        case 'INCREMENT' :
            return state + 1;
        case 'DECREMENT' :
            return state - 1;
        default : 
            return state;
    }
}

function Counter(){

    const [number,dispatch] = useReducer(reducer, 0);

    const onIncrease = () =>
    {
        dispatch ({type : 'INCREMENT'});
    }

    const onDecrease = () =>
    {
        dispatch ({type : 'DECREMENT'});
    }

    return (
        <div>
            <h1>{number}</h1>
            <button onClick = {onIncrease}>+1</button>
            <button onClick = {onDecrease}>-1</button>
        </div>
    );
}

export default Counter;
```

**index.js**

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Counter from './Counter'

ReactDOM.render(
  <Counter />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

---

## App 컴포넌트를 useReducer 로 구현하기

App 컴포넌트에 있던 상태 업데이트 로직들을 useState가 아닌 useReducer를 사용하여 구현

1. App에서 사용할 초기상태를 컴포넌트 바깥으로 분리하고 App 내부의 로직을 모두 제거
2. reducer 함수의 틀만 만들어주고, useReducer 를 컴포넌트에서 사용

**App.js**

```jsx
import React, { useRef, useMemo, useCallback, useReducer } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  input : {
    username : '',
    email : ''
  },
  users : [{
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
  }]
};

function reducer(state, action) {
  return state;
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <CreateUser />
      <UserList users={[]} />
      <div>활성사용자 수 : 0</div>
    </>
  );
}

export default App;
```

3. state 에서 필요한 값들을 비구조화 할당 문법을 사용하여 추출후, 각 컴포넌트에게 전달

App.js

```jsx
import React, { useRef, useMemo, useCallback, useReducer } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  input : {
    username : '',
    email : ''
  },
  users : [{
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
  }]
};

function reducer(state, action) {
  return state;
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;
  const {username, email} = state.inputs;

  return (
    <>
      <CreateUser username={username} email={email}/>
      <UserList users={users} />
      <div>활성사용자 수 : 0</div>
    </>
  );
}

export default App;
```

4. onChange 구현 (reducer 함수안에 action 객체 추가, onChange 함수에 dispatch로 action 발생!)

App.js

```jsx
import React, { useRef, useMemo, useCallback, useReducer } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  input : {
    username : '',
    email : ''
  },
  users : [{
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
  }]
};

function reducer(state, action) {
  switch (action.type) {
    case 'CHAGNE_INPUT' :
      return {
        ...state,
        inputs : {
          ...state.inputs,
          [action.name] : action.value
        }
      }
    default :
      return state;
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;
  const {username, email} = state.inputs;

  const onChage = useCallback (e => {
    const {name, value} = e.target;
    dispatch({
      type : 'CHANGE_INPUT',
      name,
      value
    })
  }, [])

  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange}/>
      <UserList users={users} />
      <div>활성사용자 수 : 0</div>
    </>
  );
}

export default App;
```

5. onCreate 구현 (reducer 함수 안에 action 추가, onCreate 함수 안에 dispatch로 action 발생)

**App.js**

```jsx
import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: ''
  },
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
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const { users } = state;
  const { username, email } = state.inputs;

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    });
  }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    nextId.current += 1;
  }, [username, email]);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} />
      <div>활성사용자 수 : 0</div>
    </>
  );
}

export default App;
```

6. onToggle 구현

```jsx
import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: ''
  },
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
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      };
    case 'TOGGLE_USER':
      return {
        ...state,
        users : state.user.map(user =>
          user.id !== action.id)
      }
    default:
      return state;

  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const { users } = state;
  const { username, email } = state.inputs;

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    });
  }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    nextId.current += 1;
  }, [username, email]);

  const onToggle = useCallback(id => {
    dispatch({
      type : 'TOGGLE_USER',
      id
    })
  },[])

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onToggle = {onToggle}/>
      <div>활성사용자 수 : 0</div>
    </>
  );
}

export default App;
```

7. onRemove

```jsx
import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: ''
  },
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
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      };
    case 'TOGGLE_USER':
      return {
        ...state,
        users : state.user.map(user =>
          user.id !== action.id ? {...user, active: !user.active} : user)
      }
    case 'REMOVE_USER' : 
      return {
        ...state,
        users : state.user.filter(user => user.id !== action.id)
      }
    default:
      return state;

  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const { users } = state;
  const { username, email } = state.inputs;

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    });
  }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    nextId.current += 1;
  }, [username, email]);

  const onToggle = useCallback(id => {
    dispatch({
      type : 'TOGGLE_USER',
      id
    })
  },[])

  const onRemove = useCallback(id => {
    dispatch ({
      type : 'REMOVE_USER',
      id
    })
  }, [])

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onToggle = {onToggle} onRemove = {onRemove}/>
      <div>활성사용자 수 : 0</div>
    </>
  );
}

export default App;
```

8. 활성 사용자수

```jsx
import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: ''
  },
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
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      };
    case 'TOGGLE_USER':
      return {
        ...state,
        users : state.users.map(user =>
          user.id !== action.id ? {...user, active: !user.active} : user)
      }
    case 'REMOVE_USER' : 
      return {
        ...state,
        users : state.user.filter(user => user.id !== action.id)
      }
    default:
      return state;

  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const { users } = state;
  const { username, email } = state.inputs;

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    });
  }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    nextId.current += 1;
  }, [username, email]);

  const onToggle = useCallback(id => {
    dispatch({
      type : 'TOGGLE_USER',
      id
    })
  },[])

  const onRemove = useCallback(id => {
    dispatch ({
      type : 'REMOVE_USER',
      id
    })
  }, [])

  const count = useMemo(()=> countActiveUsers(users), [users])
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onToggle = {onToggle} onRemove = {onRemove}/>
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;
```

이제 모든 기능들이 useReducer를 사용해 잘 구현 됨!

---

## useReducer vs useState - 뭐 쓸까?

- **useState** : 컴포넌트에서 관리하는 값이 딱 하나, 그 값이 단순한 숫자, 문자열, boolean 값이면 확실히 useState로 관리하는 것이 편함

```jsx
const [value, setValue] = useState(true);
```

- **useReducer** : 컴포넌트에서 관리하는 값이 여러개라 구조가 복잡해질 때
- 딱히 답이 정해진 건 아님!