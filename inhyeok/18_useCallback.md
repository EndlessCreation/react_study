# 18 . useCallback 을 사용하여 함수 재사용하기

- `useCallback`은 지난번에 배운 `useMemo`와 비슷한 Hook 다.
- `useMemo`는 특정 결과 값을 재사용 할 때 사용하는 반면, `useCallback`은 특정 함수를 새로 만들지 않고 재사용하고 싶을때 사용한다.

App.js 에 구현한 onCreate, onRemove, onToggle 함수를 보자

```javascript
const onCreate = () => {
  const user = {
    id: nextId.current,
    username,
    email,
  };
  setUsers(users.concat(user));
  setinputs({
    usename: "",
    email: "",
  });
  nextId.current += 1;
};
const onRemove = (id) => {
  setUsers(users.filter((users) => users.id !== id));
};
const onToggle = (id) => {
  setUsers(
    users.map((users) =>
      users.id === id ? { ...users, active: !user.active } : users
    )
  );
};
```

- 지금까지 App.js 에서 컴포넌트가 리렌더링 될때마다 함수를 새로 만들고 있다.
- 함수를 선언하는 것 자체만으로는 리소스를 많이 먹지는 않으나 재사용 하면 좋은 점이 나중에 props가 바뀌지 않으면 Virtual DOM 조차 리렌더링 안하게 만들 수 있는데 이 작업을 하기 위해선 함수의 최적화가 필요하다.
  <br>

## useCallback

기존의 만든 함수를 감싸주면 되는데 의존하고 있는 값을 찾아 deps에 넣어주어야 한다.

```javascript
const onChange = useCallback(
  (e) => {
    const { name, value } = e.target;
    setinputs({
      ...inputs,
      [name]: value,
    });
  },
  [inputs]
);
const onCreate = useCallback(() => {
  const user = {
    id: nextId.current,
    username,
    email,
  };
  setUsers(users.concat(user));
  setinputs({
    username: "",
    email: "",
  });
  nextId.current += 1;
}, [users, username, email]);

const onRemove = useCallback(
  (id) => {
    setUsers(users.filter((users) => users.id !== id));
  },
  [users]
);

const onToggle = useCallback(
  (id) => {
    setUsers(
      users.map((users) =>
        users.id === id ? { ...users, active: !users.active } : users
      )
    );
  },
  [users]
);
```

- onChange : inputs의 값이 바뀔때 새로 만들고 아니면 재사용,
- onCreate : users의 값, inputs로 받아온 username, email이 바뀔때
- onRemove : users가 바뀔때(입력한 id와 다른것들만 filter)
- onToggle : users가 바뀔때 (users active를 바꿈)
  이렇게 함수 최적화를 한다.

---

어떤 컴포넌트가 렌더링되고 있는지 확인하기 위해서 React DevTools라는 것을 쓴다.
![크롬웹스토어 링크](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=ko)
크롬확장 프로그램이며 이 프로그램을 사용해서 각 컴포넌트간의 관계나 어떤 컴포넌트가 렌더링 되는지를 확인할 수 있다.

---

- 여기서 input에 글을 쓸때마다 UserList전체가 렌더링 되는데 다음에 막는 방법을 알아보자.
-
