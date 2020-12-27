## 12. useRef로 컴포넌트 안 변수 만들기

- 컴포넌트에서 특정 DOM을 선택해야 할 때 `ref` 를 사용해야 한다고 배웄다. 그리고 함수형 컴포넌트에서 이를 설정할 때 `useRef`를 사용하여 설정한다고도 배웠다.
- `useRef` Hook은 DOM을 선택하는 용도 외에도, 다른 용도가 있는데 바로 **컴포넌트 안에서 조회 및 수정 할 수 있는 변수를 관리하는** 것 이다.
- 컴포넌트에서 `lef` 키워드 변수를 사용하면 리렌더링 시 초기화된다. 유지하고싶은 값을 관리하려면 useState를 사용해야하나 상태를 바꾸면 리렌더링된다.
- 하지만 `useRef`를 사용하면 어떠한 값을 기억 할 때 사용 가능하다.

> useRef로 관리하는 변수는 값이 바뀐다고 해서 컴포넌트가 리렌더링 되지 않는다.

- 즉 값을 바꾸고싶고 리렌더링을 안해도 될때 사용하면 된다. 주로 다음 예시에 많이 사용된다

1. setTimeout, setInterval 을 통해서 만들어진 id
2. 외부 라이브러리를 사용하여 생성된 인스턴스
3. scroll 위치

-**App.js**

```javascript
import React, { useRef } from "react";
import UserList from "./UserList";

function App() {
  const users = [
    {
      id: 1,
      username: "verlopert",
      email: "public.velopert@gmail.com",
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
    },
  ];
  const nextId = useRef(4);
  const onCreate = () => {
    //나중에 구현 할 목록
  };
  return <UserList users={users} />;
}
export default App;
```

- UserList.js 파일에 있던 UserList목록들이 App.js로 옮김.
- `useRef()`를 사용할 때 파라미터를 넣어주면 그 파라미터 값이 `.current`값의 기본값이 된다
- 이 값을 수정할 때에는 `.current`값을 수정하면 되고 조회할 때에는 `.current`값을 조회하면 된다.
