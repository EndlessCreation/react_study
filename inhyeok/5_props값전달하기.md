# 5. props 를 통해 컴포넌트에 값 전달하기

컴포넌트의 props라는 개념에 대해 알아보자 props는 properties의 줄임말이다. 어떠한 값을 컴포넌트에게 전달해줘야 할 때, props를 사용한다.

## props의 기본 사용법

예를 들어서 App 컴포넌트에서 Hello 컴포넌트를 사용할 때 name 이라는 값을 전달해주고 싶다고 가정해보자 그러면

- **App.js**

```javascript
import React from "react";
import Hello from "./Hello";

function App() {
  return <Hello name="react" />;
}
export default App;
```

- **Hello.js**

```javascript
import React from "react";

function Hello(props) {
  return <div> 안녕하세요 {props.name}</div>;
}
export default Hello;
```

컴포넌트에 전달되는 props 는 피라미터를 통하여 조회할 수 있고 props는 객체 형태로 전달된다. name 값을 조회하기 위해선 props.name을 하면 된다.

## 여러개의 props, 비구조화 할당

Hello 컴포넌트에 또 다른 props를 전달해보자. color라는 값을 설정해보면

- **App.js**

```javascript
import React from "react";
import Hello from "./Hello";

function App() {
  return <Hello name="react" color="red" />;
}
export default App;
```

- **Hello.js**

```javascript
import React from "react";

function Hello(props) {
  return <div style={{ color: props.color }}> 안녕하세요 {props.name}</div>;
}
export default Hello;
```

props 내부의 값을 조회할 때마다 props.를 입력하고 있는데 함수의 피라미터에서 비구조화 할당 문법을 사용하면 코드를 간결하게 작성할 수 있다.

- **Hello.js**

```javascript
import React from "react";

function Hello({ color, name }) {
  return <div style={{ color }}> 안녕하세요 {name}</div>;
}
export default Hello;
```

## defaultProps로 기본값 설정

컴포넌트에 props를 지정하지 않았을 때 기본적으로 사용 할 값을 설정하고 싶다면 컴포넌트에 defaultProps라는 값을 설정하면 된다.

- **Hello.js**

```javascript
import React from "react";

function Hello({ color, name }) {
  return <div style={{ color }}> 안녕하세요 {name}</div>;
}
Hello.defaultProps = {
  name: "이름없음",
};
export default Hello;
```

- **App.js**

```javascript
import React from 'react';
import Hello from './Hello';

function App(){
	return (
	<>
		<Hello name="react" color='red' />;
		<Hello color="pink" />
	</>
}
export default App;
```

- 실행화면
  ![image/5_1.png](image/5_1.png)

## props.children

props.children을 사용하는 방법을 알아보자.
Wrapper.js를 src에 만들자

```
|-src
|  |-Hello.js
|  |-App.js
|  |-Wrapper.js
```

- **Wrapper.js**

```javascript
import React from "react";

function Wrapper() {
  const style = {
    border: "2px solid black",
    padding: "16px",
  };
  return <div style={style}></div>;
}
export default Wrapper;
```

- **App.js**

```javascript
import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';

function App(){
	return (
	<Wrapper>
		<Hello name="react" color='red' />;
		<Hello color="pink" />
	<Wrapper/>
}
export default App;
```

Wrapper 컴포넌트 내부에 Hello 컴포넌트 2개를 넣었다.

- 실행화면
  ![image/5_2.png](image/5_2.png)
  지금은 데이터가 안보인다. Hello 컴포넌트들을 Wrapper로 감싸줬지만 Wrapper에 값을 전달했지만 Wrapper에서 props.children을 렌더링 하지 않았다.
- **Wrapper.js**

```javascript
import React from "react";

function Wrapper({ children }) {
  const style = {
    border: "2px solid black",
    padding: "16px",
  };
  return <div style={style}>{children}</div>;
}
export default Wrapper;
```

- 실행화면
  ![image/5_3.png](image/5_3.png)

### 정리

- props는 컴포넌트 간에 값을 전달한다 > 컴포넌트간 의 자식관계가 결정되는것 같음
- children은 컴포넌트 안에 컴포넌트로 props처럼 값을 보냈고 컴포넌트를 props처럼 children이라는 props객체의 값을 사용해 컴포넌트를 사용할 수 있다.
