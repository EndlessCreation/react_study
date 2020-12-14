# 4. props를 통해 자식 컴포넌트에게 값 전달하기

✍🏻 [벨로퍼트씨의 리액트 강좌 - 4편](https://velopert.com/3629) 을 참고하여 작성합니다.

✍🏻 단순히 위 레퍼런스를 요약하거나 정리하지 않을 것입니다. 스스로 공부한 내용 및 기록하고 싶은 부분만 작성할 예정입니다~

✍🏻 [벨로퍼트씨의 모던 리액트 강좌 - 5편](https://react.vlpt.us/basic/05-props.html) 을 참고하는 것이 더 낫다고 판단해서 이제부터 이 블로그를 참고하겠습니다.

## 0️⃣ 리액트 컴포넌트에서 다뤄지는 데이터인 props와 state

리액트 컴포넌트에서 다룰 수 있는 데이터에는 __props__ 와 __state__ 라는 것이 있다.

간단하게 __props는 부모 컴포넌트가 자식 컴포넌트에게 전해주는 데이터이다. 자식 컴포넌트는 부모에게서 받은 이 값을 수정할 수 없다.__

__state는 컴포넌트 내부에서 선언하고 내부에서 값을 변경할 수도 있는 데이터이다.__

## 1️⃣ Props 이해하기

~~~javascript
// App.js --> 부모 컴포넌트 역할 
import React, { Component } from 'react';
import MyName from './components/MyName';

class App extends Component {
  render() {
    return (
      <MyName name="김초희"></MyName>
    );
  }
}

export default App;
~~~

~~~javascript
// MyName.js --> 자식 컴포넌트 역할
import React, { Component, Fragment } from 'react';

class MyName extends Component {
    render() {
        return(
            <Fragment>
                <div>하이하이 난 <b>{this.props.name}</b> 이라네! 반갑네 자네^^</div>
            </Fragment>
        )
    }
}

// 이 MyName이라는 컴포넌트를 외부에서도 가져다 사용할 수 있게 하기 위함
export default MyName;
~~~

이 외에도 여러 개의 props 전달하기, 비구조화 할당 문법을 사용해서 props 전달하기, default props 전달하기 등 props 사용법이 여러가지가 있으니 [벨로퍼트씨의 모던 리액트 강좌 - 5편](https://react.vlpt.us/basic/05-props.html) 을 보고 알아보자.

## 2️⃣ props.children 이해하기

* props = 부모 __컴포넌트의 속성__ 으로 들어가는 값을 자식 컴포넌트에서 받아올 때 사용

* props.children = 부모 컴포넌트의 속성이 아니라 __부모 컴포넌트 태그 사이__ 에 넣은 값을 자식 컴포넌트에서 받아올 때 사용

~~~javascript
// 자식 컴포넌트
function Wrapper({ children }) {
    const divStyle = {
        border: '2px solid black',
        padding: '16px'
    }

    return(
        <>
            <dix style={divStyle}>
                {children}
            </dix>
        </>
    )
}
~~~
~~~javascript
// 부모 컴포넌트
function App() {
  
    return (
      <>
        <Wrapper>
          <MyName name="김초희"></MyName>
        </Wrapper>
      </>
      
    ); 
}
~~~

## 🛠 Error Solved

리액트 컴포넌트를 function으로 작성할 때 props 예제가 안 먹고, __TypeError: Cannot read property state of undefined__ 에러가 떴다.

이것저것 해보다가 벨로퍼트씨가 class로 하니까 그대로 class로 해보자 하고 해봤더니 그제서야 됐다.

function으로 작성할 때는 props를 어떻게 작성해야 하낭? 방법이 다른가?

방법이 달랐다,,

위에서 예시로 든 class 코드를 function으로 바꿔서 props를 사용하려면 

~~~javascript
// App.js --> 부모 컴포넌트 역할
import React from 'react';
import MyName from './components/MyName';

function App() {
  
    return (
      <MyName name="김초희"></MyName>
    ); 
}

export default App;
~~~

~~~javascript
import React, { Fragment } from 'react';

function MyName(props) {
    return(
        <Fragment>
            <div>하이하이 난 <b>{props.name}</b> 이라네!! 반갑네 자네^^</div>
        </Fragment>
    )
}

export default MyName;
~~~

이렇게 자식 컴포넌트의 매개변수로 props를 넘겨줘야 하고 this.props.name을 props.name이라고 써야 했다.

--> [여기](https://react.vlpt.us/basic/05-props.html) 참고함

# 끝!

이 내용과 관련된 프로젝트는 PropsStatePracticeApp 이다.