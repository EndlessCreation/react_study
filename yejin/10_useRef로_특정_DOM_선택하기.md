# 10장 useRef로 특정 DOM 선택하기

---

## 특정 DOM을 직접 선택해야하는 상황

- 특정 element의 크기를 가져와야 할 때
- 스크롤 바 위치를 가져오거나 설정해야할 때
- 포커스를 설정해줘야 할 때
- Video.js JWPlayer 등 HTML5 Video 관련 라이브러리를 사용할 때 등등

## 리액트 ref

- 자바스크립트의 getElementById, querySelector 등과 같은 DOM Selector 이다
- 함수형 컴포넌트에서 ref를 사용할 때에는 useRef라는 Hook 함수를 사용
- 클래스형 컴포넌트에서는 콜백함수를 사용하거나 React.createRef

---

### 👩‍💻 초기화 버튼을 눌렀을 때 이름 input에 포커스가 잡히도록 useRef 사용

InputSample.js

```jsx
import React, {useState, useRef} from 'react';

function InputSample() {
  const [inputs, setInputs] = useState({
    value : 0,
    name : ''
  })

  const nameInput = useRef();

  const [value, name] = inputs;
  
  const onChange = (e) => {
    const {value, name} = e.target;
    setInputs({
      ...inputs,
      [name] : value
    });
  };

  const onReset = () => {
    setInputs({
      value : 0,
      name : ''
    })
    nameInput.current.focus();
  };

  return (
    <div>
      <input name = "value" onChange = "onChange" placeholder = "값" value = {value} ref = {nameInput} />
      <input name = "name" onChange = "onChange" placeholder = "이름" value = {name} ref = {nameInput} />
      <button onClick = {onReset}>초기화</button>
    </div>
  )
}

export default InputSample;
```

코드 설명

1. useRef를 React로부터 import 함 

    ```jsx
    import React, {useState, useRef} from 'react';
    ```

2. useRef객체를 적절한 이름으로 생성

    ```jsx
    const nameInput = useRef();
    ```

3. 원하는 요소에 집어넣음

    ```jsx
    <input name = "value" onChange = "onChange" placeholder = "값" value = {value} ref = {nameInput} />
    <input name = "name" onChange = "onChange" placeholder = "이름" value = {name} ref = {nameInput} />
    ```

4. 원하는 함수에 집어 넣음

    ```jsx
     const onReset = () => {
        setInputs({
          value : 0,
          name : ''
        })
        nameInput.current.focus();  //지정된 요소로 포커스가 가도록 하는 함수
      };
    ```