# 12. useRef로 컴포넌트 안의 변수 만들기

### 지난시간 (10강)

- 컴포넌트에서 특정 DOM을 선택해야할 때, ref를 사용해야한다고 배움
- 함수형 컴포넌트에서 이를 설정할 때 useRef를 사용하여 설정한다고 배움

## useRef의 새로운 용도

- 컴포넌트 안에서 조회 및 수정할 수 있는 변수를 관리
- useRef로 관리하는 변수는 값이 바뀐다고 해서 컴포넌트가 리렌더링 되지 않음
- 리액트 컴포넌트에서의 상태는 상태를 바꾸는 함수를 호출하고 나서 그 다음 렌더링 이후로 업데이트된 상태를 조회 할 수 있는 반면, useRef로 관리하고 있는 변수는 설정 후 바로 조회 할 수 있다.
- 이러한 변수를 이용해 아래의 다음과 같은 값을 관리 가능
    1. setTimeout, setInterval을 통해 만들어진 id
    2. 외부 라이브러리를 사용하여 생성된 인스턴스
    3. scroll 위치

---

### 해볼 공부

App 컴포넌트에서 useRef를 사용하여 변수를 관리 해볼 것, 우리가 앖으로 배열에 새 항목을 추가할건데, 새 항목에서 사용할 고유 id를 관리하는 용도일 것임.

1. useRef를 사용하여 변수를 관리하기 전 할일

    → **배열을 App에 선언하고 UserList에게 props로 전달해주기**

**App.js**

```jsx
import React from 'react';
import UserList from './UserList';

function App(){
  const user = [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com'
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com'
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com'
    }
  ];
  return (

      <UserList users={users}/>
  
  )
}

export default App;
```

**UserList.js**

```jsx
import React from 'react';

function User({user}) {
  return (
    <div>
      <b>{user.username}</b><span>{(user.email)}</span>
    </div>
  )
}

function UserList ({users}) {

  return (
    <div>
      {users.map(user => (
        <User user={user} key={user.id}/>
      ))}
    </div>
  )
}

export default UserList;
```

2. 이제 **App에서 useRef()를 사용하여 nextId 라는 변수 만들기**

**App.js**

```jsx
import React, {useRef} from 'react';
import UserList from './UserList';

function App(){
  const user = [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com'
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com'
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com'
    }
  ];

  const nextId = useRef(4);
  const onCreate = () => {
    //나중에 구현 할 배열에 항목 추가하는 로직
    //...

    nextId.current += 1;
  };

  const nextId = useRef(4)

  return (

      <UserList users={users}/>
  
  )
}

export default App;
```

→ useRef()를 사용할 때 파라미터를 넣어주면, 이 값(파라미터)이 .current 값의 기본값!

→ 수정시에는 .current 값을 수정, 조회 시에는 .current 값을 조회!