# 21 . Custom Hook 만들기

컴포넌트를 만들다 보면 반복되는 로직이 발생한다. 예를 들어서 input을 관리하는 코드는 관리 할 때마다 비슷한 코드가 반복된다.
이럴때는 커스텀Hooks를 만들어서 반복되는 로직을 쉽게 재사용하는 방법을 알아보자

```
|-src
|  |-hooks
|       |-useInputs.js
```

- **useInputs.js**

```javascript
import {useState, useCallback} from 'react';

function useInputs(initialForm){
	const [form, setForm] = useState(initialForm);
	//change
	const onChange = useCallback((e) => {
		const { name, value } = e.target;
		setForm((form) => ({ ...form, [name] : value }));
	}, []);

	const reset = useCallback(() => setForm(initialForm, [initialForm]));
	return [form, onChange, reset];
```

커스텀 Hooks를 만드는 방법은 그냥 그 안에 Hooks를 사용하여 원하는 기능을 구현해 주고 컴포넌트에서 사용하고 싶은 값들을 반환해주면 된다.

- useInputs 이라는 함수를 만들어서 파라미터로 initialForm를 받아온다(형식은 파라미터에 맞게 바뀜)
- onChange : e.target로 name과 value 를 받아오고 setForm(함수형 업데이트) 형식으로 구현 deps는 의존하는 상태가 없으므로 빈칸
- reset : Form을 초기화시키는 역할, CreateUser에 사용될듯
- return : 객체형태나 배열형태든 상관 없다 기존 inputs의 역할은 form이 대신 하면 되고 onChange는 App.js의 onChange와 역할이 동일. reset은 초기화시키고 싶을 때 사용할 수 있다.

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
  // 기존 inputs > form으로 대체
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
    //change input case가 사라짐.
    case "CREATE_USER":
      return {
        //초기화 기능은 reset()함수로 구현
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
  const [{ usename, email }, onChange, reset] = useInputs({
    username: "",
    email: "",
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;
  const nextId = useRef(4);

  //onChange 함수 삭제
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

## 추가공부

useInputs.js 에서 useState Hooks을 사용한걸 useReducer로 사용해보자.

```javascript
import { useCallback, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.name]: action.value,
      };
    case "RESET":
      return Object.keys(state).reduce((acc, current) => {
        acc[current] = "";
        return acc;
      }, {});
    default:
      return state;
  }
}

function useInputs(initialForm) {
  const [form, dispatch] = useReducer(reducer, initialForm);
  //change
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_INPUT",
      name,
      value,
    });
  }, []);

  const reset = useCallback(() => {
    dispatch({
      type: "RESET",
    });
  }, []);
  return [form, onChange, reset];
}

export default useInputs;
```

마지막 Reset 기능 구현이 힘들어서 답안을 봤는데

```javascript
  return Object.keys(state).reduce((acc, current) => {
     acc[current] = "";
     return acc;
```

설명)

-**Object.keys**
객체의 key값을 배열로 반환한다.

```javascript
const setObject = {
	username : '조인혁',
	email : 'joinhyeok@example.com',
}
객체 생성
```

```javascript
console.log(setObject)
//실행결과
{username : "조인혁", email : "joinhyeok@example.com"}
```

```javascript
console.log(Object.keys(setObject));
//실행결과, 객체의 key값을 가진 배열로 반환한다.
["username", "email"];
```

- **배열.reduce()**
  `배열.reduce((누적값, 현재값, 인덱스. 요소)) => { return 결과 } , 초깃값);`

```javascript
console.log(Object.keys(setObject.reduce((acc,current)=> { acc[current]=''; return acc;},{}));
//실행결과
 { username : "", email: ""};
```

- key값을 가진 배열을 reduce를 실행. 초기값을 {} 객체 형태로 지정,

|  callback  | 누적값(acc) | 현재값(current) |        인덱스(우리예시는 사용x)         |      요소(array)      |
| :--------: | :---------: | :-------------: | :-------------------------------------: | :-------------------: |
| 1번째 호출 | 초기값=={}  |   'username'    | 0(초기값을 지정하면 0 지정안할시에는 1) | ['username','email']' |
| 2번째 호출 | 'username'  |     'email'     |                    1                    | ['username','email']  |

`최종 acc : {'username: "", email ""}`

- 여기서 의문 `acc[current]= ''` 이 어떻게 진행되는가?
  객체의 속성에 접근할 때 점 표기법이 익숙 , 예를들어 어떤 객체 `Object.key` 로접근하는걸
  `Object[key]`이런 형식으로 사용 가능
- [MDN속성접근자](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Property_Accessors) 참고
