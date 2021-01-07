# 21_커스텀_Hooks_만들기

컴포넌트를 만들다보면, **반복되는 로직**이 자주 발생 ex) input을 관리하는 아주 비슷한 코드들

→ **커스텀 Hooks를 만들어 반복되는 로직을 쉽게 재사용!**

커스텀 Hooks를 만드는 방법 : 그냥 그 js 파일 안에서 useState, useEffect, useReducer, useCallback 등 Hooks를 사용하여 원하는 기능을 구현해주고, 컴포넌트에서 사용하고 싶은 값들을 반환

src 디렉토리 → hooks 디렉토리 → useInput.js 파일

**useInput.js**

```jsx
import {useState, useCallback} from 'react';

function useInputs(initialForm){
    const [form, setForm] = useState(initialForm);
    //change
    const onChange = useCallback(e=>{
        const {name, value} = e.target;
        setForm(form=>({...form, [name] : value}));
    },[]);

    const reset = useCallback(()=> setForm(initialForm, [initialForm]));
    return [form, onChange, reset];
}

export default useInputs;
```

이제 만든 useInputs Hook을 App.js 에 사용해보자!

1. useReducer쪽에서 사용하는 inputs를 없애기
2. 이와 관련된 작업을 useInputs로 대체해주기
3. 새로운 항목을 추가할 때 input 값을 초기화해야하므로 데이터 등록 후, reset() 호출

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

function App() {
//useInputs에서 반환값 받아옴
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
    reset(); //reset 함수 추가
    nextId.current += 1;
  }, [username, email, reset]); //reset 추가

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
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;
```

숙제 : useInputs 커스텀 Hook을 한번 useReducer를 사용해서 구현해보기