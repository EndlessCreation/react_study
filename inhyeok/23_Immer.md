# 23 Immer 를 사용한 더 쉬운 불변성 관리

리액트에서 배열이나 객체를 업데이트 해야 할 때에는 직접 수정을 하면 안되고 불변성을 지켜주면서 업데이트를 해야 한다

- 예시

```javascript
const object = {
	a : 1,
	b : 2,
},
object.b = 3;
```

위 방법은 불변성을 지키지 못한다.

```javascript
const object = {
  a: 1,
  b: 2,
};
const changeObject = {
  ...object, // spread 연산자를 사용해서 불변성을 지킴
  b: 3,
};
```

---

배열도 마찬가지로 `push`나 `splice` 같이 배열을 직접 수정하는것은 안되고
`concat`이나 `filter`, `map` 등 새로운 배열을 만드는 함수를 사용해야 한다.
예를들어

```javascript
const state = {
  posts: [
    {
      id: 1,
      title: "제목",
      body: "내용",
      comments: [
        {
          id: 1,
          test: "잘읽었습니다",
        },
      ],
    },
    {
      id: 2,
      title: "제목",
      body: "내용",
      comments: [
        {
          id: 2,
          text: "재미없네요",
        },
      ],
    },
  ],
  selectedId: 1,
};
```

이런 복잡한 객체가 있다고 가정하자 여기서 posts 배열 안의 id가 1인 객체를 찾아서 commets에 새로운 댓글 객체를 추가해줘야한다고 했을때

```javascript
const nextState = {
	...state // 이전객체를 가져오고
	posts : state.posts.map(posts =>
		post.id === 1
			? {
				...post,
				comments : post.comments.concat({
					id:3,
					text: '새 댓글'
				})
			}
			: post // 아니면 다시 post 반환
		)
};
```

이런 복잡한 구조를 갖게 된다

이때 immer 라는 라이브러리를 사용하면 다음과 같이 구현할 수 있다.

```javascript
const nextState = produce(state, draft => {
	const post = draft.posts.find(post => post.id ===1 );
	post.comments.push({
		id:3,
		text : '쉽지?'.
	});
});
```

좀더 간단하게 변환 가능

<br>

## Immer 사용법

기존에 만들었던 코드에 immer을 적용시켜 보자,

```
yarn add immer
```

- 이후 코드 상단에 immer을 불러와줘야 하는데 보통 `produce` 라는 이름으로 불러온다

```javascript
import produce from "immer";
```

- 이후 `produce` 함수를 사용 할 때에 첫 번째 파라미터에는 수정하고 싶은 상태, 두번째 파라미터에는 어떻게 업데이트 하고 싶을지 정의하는 함수를 넣어준다
- 예시

```javascript
const state = {
  number: 1,
  dontCahgneMe: 2,
};
const nextState = produce(state, (draft) => {
  draft.number += 1;
});
```

<br>
<br>

## Reducer 에서 Immer 사용하기

```javascript
function reducer(state, action) {
  switch (action.type) {
    case "CREATE_USER":
      return producer(state, (draft) => {
        draft.users.push(action.user);
      });
    case "TOGGLE_USER":
      return producer(state, (draft) => {
        const user = draft.users.find((user) => user.id === action.id);
        user.active = !user.active;
      });
    case "REMOVE_USER":
      return producer(state, (draft) => {
        const index = draft.users.findIndex((user) => user.id === action.id);
        draft.users.splice(index, 1);
      });
    default:
      return state;
  }
}
```

<br>

## Immer와 함수형 업데이트

- 이전에 useState를 사용 할 때 함수형 업데이트란걸 할 수 있다고 배웠다. 함수형 업데이트를 하는 경우 Immer을 사용하면 편하게 작성 가능하다(두번째 파라미터에 들어가는 함수 자체가 업데이트 개념이기때문에)
- `produce` 함수에 두 개의 파라미터를 넣게 된다면, 첫 번째 파라미터에 넣은 상태를 불변성을 유지하면서 새로운 상태를 만들어주지만 , 첫번째 파라미터를 생략하게 되면 반환 값은 새로운 상태가 아닌 업데이트를 해주는 함수가 된다.

```javascript
const [todo, setTodo] = useState({
  text: "Hello",
  done: false,
});

const onClick = useCallback(() => {
  setTodo(
    produce((draft) => {
      draft.done = !draft.done;
    })
  );
}, []);
```
