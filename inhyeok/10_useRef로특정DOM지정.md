## 10. useRef로 특정 DOM 선택하기

- JavaScript를 사용할 때에는 우리가 특정 DOM을 선택해야 하는 상황에 getElementById, querySelector 같으 DOM Selector 함수를 사용해서 DOM을 선택한다.
- 리액트를 사용하는 프로젝트에서도 가끔식 DOM을 직접 선택해야 하는 상황이 발생 할 때도 있다. 예를 들어 특정 엘리먼트의 크기를 가져와야 한다던지, 스크롤바 위치를 가져오거나 설정해야 한다던지, 또는 포커스를 설정해줘야 된다던지 등 다양한 상황에 DOM을 선택해야 하는 상황이 발생한다.
- 이럴땐 리액트에서는 `ref` 라는 것을 사용한다.
- 함수형 컴포넌트에서 ref를 사용할 때 에는 useRef 라는 Hook 함수를 사용한다. 전 강의에서 만든 InputSample 에서 초기화 버튼을 누르면 포커스가 input 에 잡히도록 useRef 를 사용해 기능을 구현해보자.

-**InputSample.js**

```javascript
import React, { useState, useRef } from "react";

function InputSample() {
	const [inputs, setInputs] = useState({
		name : "",
		nickname : "",
	})
	const nameInput = useRef();
	const {name , nickname } = inputs;
	const onChange = (e) => {
		const { value , name } = e.target;
		setInputs({
			...inputs,
			[name]:value,
		});
	};
	const onReset = () => {
		setInputs({
			name:"",
			nickname:"",
		});
		nameInput.current.focus();
	};

	return (
		<div>
			<input
				name="name"
				placeholder="이름"
				onChange={onChange}
				value={name}
				ref={nameInput}
			/>
			<input
				name="nickname"
				placholder="닉네임"
				onChange={onChagne}
				value={nickname}
			/>
			<button onClick={onReset}>초기화</button>
			<div>
				<b>값 : </b>
				{name}:({nickname})
			</div>
		);
	)
export default InputSample;
```

```javascript
const nameInput = useRef();
```

- import 한 useRef를 설정해주고 onReset()함수를 실행하면 `nameInput.current.focus()`를 적어주면 이거에 맞는 ref로 포커스를 하게 된다.
- 포커스가 되는 곳에는 `ref={nameInput}` 을 적어준다.
