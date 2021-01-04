# 26. styled-components

✍🏻 [벨로퍼트씨의 모던 리액트 강좌 - styled componenets](https://react.vlpt.us/styling/03-styled-components.html) 을 참고하여 작성합니다.

## 1️⃣ What is styled-components?

* CSS in JS 를 가능하게 하는 라이브러리이다.

* 말그대로 자바스크립트 안에 css를 작성하는 것

* --> [styled-components 공식 도큐먼트](https://styled-components.com/)

## 2️⃣ styled-components 사용법

* __새 프로젝트 만들기__

  * styled-components-app 이라는 프로젝트를 만듬

  * 프로젝트에 yarn add styled-components 명령어 작성하여 라이브러리 설치하기

* __본격적으로 styled-components 사용하기__

  * App.js에 아래와 같이 styled-components 라이브러리 import하기

    * styled-components를 사용하려는 js 파일에 항상 import 해야함

    * ~~~javascript
      import styled from 'styled-components';
      ~~~

  * App.js에 아래와 같은 코드 작성해보기

    * ~~~javascript
      // App.js
      import React from 'react';
      import styled from 'styled-components';

      // 1. styled-components 사용해서 스타일링하기
      const Circle1 = styled.div`
        width: 5rem;
        height: 5rem;
        background: black;
        border-radius: 50%;
      `;

      function App() {
        return (
          <>
            {/* 2. 스타일링한 Circle을 바로 컴포넌트마냥 사용 가능 */}
            <Circle1 />
          </>
        );
      }

      export default App;
      ~~~

  * <img width="367" alt="28" src="https://user-images.githubusercontent.com/31889335/103532200-28d1ce00-4ece-11eb-93c9-482144f91841.png">

  * styled-components를 사용해서 스타일링하면 스타일링과 동시에 컴포넌트가 생성된다.

  * div 스타일링을 하고 싶으면 styled.div\`` 라고 하면 되고, input 스타일링을 하고 싶으면 styled.input\``을 하면 된다.

  * 컴포넌트가 가지고 있는 props를 스타일링인 styled-components에도 적용시킬 수 있다.

    * styled-components 라는 이름의 뜻이 스타일링된 컴포넌트인 것이랑 연상할 수 있눼

    * ~~~javascript
      // App.js
      import styled from 'styled-components';

      ...

      // color라는 props가 있으면 background를 해당 색으로 설정하고, 없으면 black으로 설정
      // ${} 안에 함수를 넣어서 동적으로 스타일링 가능
      // or 연산자 사용 = 하나라도 true이면 true임.
      const Circle2 = styled.div`
        width: 5rem;
        height: 5rem;
        background: ${props => props.color || 'black'};
        border-radius: 50%;
      `;

      function App() {
        return (
          <>
            <Circle1 />
            {/* 1. color라는 props 추가 */}
            <Circle2 color="blue"/>
          </>
        );
      }

      export default App;
      ~~~

  * 스타일링에 조건부를 줄 수도 있음

    * ~~~javascript
      // App.js

      // 1. styled-components 라이브러리로부터 css 추가
      import styled, { css } from 'styled-components';

      ...
      // true일 때 지정해준 css 값이 설정됨
      const Circle3 = styled.div`
      width: 5rem;
      height: 5rem;
      background: ${props => props.color || 'black'};
      border-radius: 50%;
      ${props =>
        props.huge && css`
          width: 10rem;
          height: 10rem;
        `
        };
      `;

      function App() {
        return (
          <>
            <Circle1 />
            <Circle2 color="blue"/>
            <Circle3 color="pink" huge />
          </>
        );
      }
      ~~~

    * <img width="300" alt="29" src="https://user-images.githubusercontent.com/31889335/103534403-24a7af80-4ed2-11eb-85c1-ae0a477546e8.png">

    * 여러 개의 css를 조건부로 넣고 싶으면 css\``를 사용해야 한다.

* __Button 만들어보기__

  * src/components/Button.js 컴포넌트 만들기

  * 이후로는 너무 길어서 쭉 한 번 읽어봄,, 정리 못해~~!!