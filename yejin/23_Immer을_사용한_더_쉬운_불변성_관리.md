# 23. Immer 를  사용한 더 쉬운 불변성 관리

리액트에서 배열이나 객체를 업데이트 할 때는 직접 수정하면 안되고, **불변성을 지켜주면서 업데이트** 해야한다.

**객체**의 경우

```jsx
//객체가 이렇게 있다고 했을 때
const object = {
	a : 1,
	b : 2
};

//잘못된 방법 : 직접 수정하면 안됨
object.c = 3;

//옳은 방법 : 불변성 지켜주기 (spread)
const nextObject = {
	...object,
	c : 3
};
```

**배열**의 경우

- push, splice 등의 함수를 사용하거나 n 번째 항목을 직접 수정하면 안되고
- concat, filter, map 등의 함수를 사용해야 한다.

```jsx
//배열이 이렇게 있을 때,
const todos = [
{
	id : 1,
	text : '할 일 #1',
	done : true
},
{
	id : 2,
	text : '할 일 #2',
	done : false
}
];

// 1) concat을 이용한 업데이트 방법
const inserted = todos.concat ({
	id : 3,
	text : '할 일 #3',
	done : false
});

// 2) filter을 이용한 업데이트 방법
const filtered = todos.filter( todo => todo.id !== 2 );

// 3) map을 이용한 업데이트 방법
const toggled = todos.map(
	todo => todo.id === 2
		? {
			...todos,
			done : !todo.done,
		}
		: todo
);
```

데이터의 구조가 복잡해지면 불변성을 지켜나가면서 업데이트하기 조금 까다로워진다.

다음과 같은 배열이 있다고 가정하자 (복잡..)

```jsx
const state = {
  posts: [
    {
      id: 1,
      title: '제목입니다.',
      body: '내용입니다.',
      comments: [
        {
          id: 1,
          text: '와 정말 잘 읽었습니다.'
        }
      ]
    },
    {
      id: 2,
      title: '제목입니다.',
      body: '내용입니다.',
      comments: [
        {
          id: 2,
          text: '또 다른 댓글 어쩌고 저쩌고'
        }
      ]
    }
  ],
  selectedId: 1
};
```

여기서 posts 배열안의 id가 1인 post 객체를 찾고, comments에 새로운 댓글 객체를 추가해주기

```jsx
const nextState = {
	...state,
	posts : state.posts.map ( post =>
		post.id === 1
			? {
					...post,
					comments : post.comments.concat({
						id : 3,
						text : '새로운 댓글'
					}
				: post
	)
};
```

→ 꽤나 복잡..

이를 immer 라는 라이브러리를 사용해 한눈에 들어오게 구현해보자

```jsx
const nextState = produce(state, draft => {
  const post = draft.posts.find(post => post.id === 1);
  post.comments.push({
    id: 3,
    text: '와 정말 쉽다!'
  });
});
```

---

## Immer ?

- 우리가 상태를 업데이트 할 때, 불변성을 신경쓰지 않으면서 업데이트를 해주면 **Immer가 불변성 관리를 대신** 한다.

### Immer 사용법

- immer 설치

```jsx
$ yarn add immer
```

- 코드의 상단에서 immer 불러오기 (보통 produce 라는 이름으로 불러옴)

```jsx
import produce from 'immer';
```

- produce 함수 사용 : 첫번째 파라미터 → 수정하고 싶은 상태, 두번째 파라미터 → 어떻게 업데이트하고 싶을 지 정의하는 함수

    두번째 파라미터에 넣는 함수에서는 불변성에 대해 신경쓰지 않고 그냥 업데이트 해주면 알아서 해준다!

```jsx
const state = {
  number: 1,
  dontChangeMe: 2
};

const nextState = produce(state, draft => {
	draft.number += 1;
});

console.log(nextState);
// { number : 2, dontChangeMe : 2 }
```

### Reducer 에서 Immer 사용하기

- immer 을 사용해서 간단해지는 업데이트가 있고, 오히려 코드가 길어지는 업데이트들이 있다.
- 이전 프로젝트의 상태의 경우 **users 배열이 객체의 깊은 곳에 위치하지 않아서** 새항목을 추가하거나 제거할 때는 Immer 를 사용하는 것보다 concat 이나 filter을 사용하는 것이 더 편리
- 하지만 사용법을 익히기 위해 Immer을 사용하여 처리해보겠다.

**App.js**

```jsx
import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './hooks/useInputs';
import produce from 'immer';

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
      return produce(state, draft => {
				draft.users.push(action.user);
			});

    case 'TOGGLE_USER':
      return produce(state, draft => {
				const user = draft.users.find(user => user.id === action.id);
				user.active = !user.active;
			});

    case 'REMOVE_USER':
      return produce(state, draft => {
        const index = draft.users.findIndex(user => user.id == action.id);
				draft.users.splice(index, 1);
      };
    default:
      return state;
  }
}

// UserDispatch 라는 이름으로 내보내준다.
export const UserDispatch = React.createContext(null);

function App() {
  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <UserDispatch.Provider value = {dispatch}>
      <CreateUser
      />
      <UserList users={users} />
      <div>활성사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;
```

→immer을 사용한다고 코드가 다 짧아지는 것은 아니기 때문에 Immer을 사용한다고 해서 모든 업데이트 로직에서 사용을 할 필요는 없다.

---

### Immer 와 함수형 업데이트

우리는 이전에 useState을 사용할 때 함수형 업데이트란걸 할 수 있다고 배웠다. 예를 들면

```jsx
const [todo, setTodo] = useState({
  text: 'Hello',
  done: false
});

const onClick = useCallback(() => {
  **setTodo(todo => ({
    ...todo,
    done: !todo.done
  }));
}, []);**
```

→ setTodo 함수에 업데이트 해주는 함수를 넣음으로써, 만약 useCallback을 사용하는 경우 두번째 파라미터인 deps 배열에 todo를 넣지 않아도 되게 된다.

→ 이렇게 **함수형 업데이트를 하는 경우, Immer을 사용**하면 상황에 따라 더 편하게 코드 작성 가능

**produce 함수의 두개의 파라미터 조정**

- **두 개의 파라미터**를 넣게 되면, 첫번째 파라미터에 넣은 상태를 **불변성을 유지**하면서 새로운 상태를 만듦
- **첫번째 파라미터를 생략하고 바로 업데이트 함수**를 넣어주게 되면, **반환값은 새로운 상태가 아닌 상태를 업데이트 해주는 함수가 됨**
- 아래 코드를 봐보자

```jsx
const todo = {
  text: 'Hello',
  done: false
};

const updater = produce**(draft => {
  draft.done = !draft.done;
})**;

const nextTodo = updater(todo);

console.log(nextTodo);
**// { text: 'Hello', done: true }**
```

→ 결국 produce가 반환하는 것 = 업데이트 함수

- useState의 업데이트 함수를 사용할 때 다음과 같이 구현하게 된다.

```jsx
const [todo, setTodo] = useState({
  text: 'Hello',
  done: false
});

**const onClick = useCallback(() => {
  setTodo(
    produce(draft => {
      draft.done = !draft.done;
    })
  );
}, []);**
```

### 정리

- Immer은 분명히 정말 편한 라이브러리라는 것은 사실이다. 하지만, 확실히 알아둘 점은, 성능적으로는 Immer을 사용하지 않는 코드가 조금 더 빠르다.
- Immer을 사용한다고 해도, 필요한 곳에만 쓰고, 간단히 처리 될 수 있는 곳에서는 그냥 일반 JavaScript로 구현해라