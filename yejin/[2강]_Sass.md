# 1. Sass

## 1️⃣ Sass 란?

- CSS preprocessor로서, 복잡한 작업을 쉽게 할 수 있게 해주고, 코드의 재활용성을 높여줄 뿐만 아니라, 코드의 가독성을 높여주어 유지보수를 쉽게 해준다.

## 👩‍💻 Button 컴포넌트 만들기

**components/Button.js**

```jsx
import React from 'react';
import classNames from 'classnames';
import './Button.scss';

function Button({ children, size, color, outline, fullWidth }) {
  return (
    <button
      className={classNames('Button', size, color, { outline, fullWidth })}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  size: 'medium',
  color: 'blue'
};

export default Button;
```

**components/Button.scss**

```jsx
$blue: #228be6;
$gray: #495057;
$pink: #f06595;

@mixin button-color($color) {
  background: $color;
  &:hover {
    background: lighten($color, 10%);
  }
  &:active {
    background: darken($color, 10%);
  }
  &.outline {
    color: $color;
    background: none;
    border: 1px solid $color;
    &:hover {
      background: $color;
      color: white;
    }
  }
}

.Button {
  display: inline-flex;
  color: white;
  font-weight: bold;
  outline: none;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  // 사이즈 관리
  &.large {
    height: 3rem;
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 1.25rem;
  }

  &.medium {
    height: 2.25rem;
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 1rem;
  }

  &.small {
    height: 1.75rem;
    font-size: 0.875rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  // 색상 관리
  &.blue {
    @include button-color($blue);
  }

  &.gray {
    @include button-color($gray);
  }

  &.pink {
    @include button-color($pink);
  }

  & + & {
    margin-left: 1rem;
  }

  &.fullWidth {
    width: 100%;
    justify-content: center;
    & + & {
      margin-left: 0;
      margin-top: 1rem;
    }
  }
}
```

**App.js**

```jsx
import React from 'react';
import './App.scss';
import Button from './components/Button';

function App() {
  return (
    <div className="App">
      <div className="buttons">
        <Button size="large">BUTTON</Button>
        <Button>BUTTON</Button>
        <Button size="small">BUTTON</Button>
      </div>
      <div className="buttons">
        <Button size="large" color="gray">
          BUTTON
        </Button>
        <Button color="gray">BUTTON</Button>
        <Button size="small" color="gray">
          BUTTON
        </Button>
      </div>
      <div className="buttons">
        <Button size="large" color="pink">
          BUTTON
        </Button>
        <Button color="pink">BUTTON</Button>
        <Button size="small" color="pink">
          BUTTON
        </Button>
      </div>
      <div className="buttons">
        <Button size="large" color="blue" outline>
          BUTTON
        </Button>
        <Button color="gray" outline>
          BUTTON
        </Button>
        <Button size="small" color="pink" outline>
          BUTTON
        </Button>
      </div>
      <div className="buttons">
        <Button size="large" fullWidth>
          BUTTON
        </Button>
        <Button size="large" fullWidth color="gray">
          BUTTON
        </Button>
        <Button size="large" fullWidth color="pink">
          BUTTON
        </Button>
      </div>
    </div>
  );
}

export default App;
```

**App.scss**

```jsx
.App {
  width: 512px;
  margin: 0 auto;
  margin-top: 4rem;
  border: 1px solid black;
  padding: 1rem;
}
```

**실행결과**

![1%20Sass%2056fec17cd0814de38cab87732fa73ed7/Untitled.png](1%20Sass%2056fec17cd0814de38cab87732fa73ed7/Untitled.png)

## 2️⃣ ...rest props 전달하기

- 컴포넌트에 만약 onClick을 넣어주어 필요한 이벤트가 각각있을 경우 넣어주는 것이 귀찮..
- 이때 바로 **spread와 rest** 이 필요!
- 이들은 주로 배열과 객체, 함수의 파라미터, 인자를 다룰 때 사용하는데, **컴포넌트에서도 사용가능**!

```jsx
import React from 'react';
import classNames from 'classnames';
import './Button.scss';

function Button({ children, size, color, outline, fullWidth, **...rest** }) {
  return (
    <button
      className={classNames('Button', size, color, { outline, fullWidth })}
      **{...rest}**
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  size: 'medium',
  color: 'blue'
};

export default Button;
```

- ...rest 를 사용하여 우리가 지정한 props를 제외한 값들을 rest라는 객체에 모아주고, <button> 태그에  {...rest}를 해주면, rest안에 있는 객체안의 값들을 모두 <button>태그에 설정을 해준다

👩‍💻 만약 App.js에서 사용한 가장 첫번째 버튼에 onClick을 설정해준다면?

**App.js**

```jsx
import React from 'react';
import './App.scss';
import Button from './components/Button';

function App() {
  return (
    <div className="App">
      <div className="buttons">
        <Button size="large" onClick={() => console.log('클릭됐다!')}>
          BUTTON
        </Button>
        <Button>BUTTON</Button>
        <Button size="small">BUTTON</Button>
      </div>
      <div className="buttons">
        <Button size="large" color="gray">
          BUTTON
        </Button>
        <Button color="gray">BUTTON</Button>
        <Button size="small" color="gray">
          BUTTON
        </Button>
      </div>
      <div className="buttons">
        <Button size="large" color="pink">
          BUTTON
        </Button>
        <Button color="pink">BUTTON</Button>
        <Button size="small" color="pink">
          BUTTON
        </Button>
      </div>
      <div className="buttons">
        <Button size="large" color="blue" outline>
          BUTTON
        </Button>
        <Button color="gray" outline>
          BUTTON
        </Button>
        <Button size="small" color="pink" outline>
          BUTTON
        </Button>
      </div>
      <div className="buttons">
        <Button size="large" fullWidth>
          BUTTON
        </Button>
        <Button size="large" color="gray" fullWidth>
          BUTTON
        </Button>
        <Button size="large" color="pink" fullWidth>
          BUTTON
        </Button>
      </div>
    </div>
  );
}

export default App;
```

💡 **컴포넌트가 어떤 props를 받을 지 확실하지 않지만그대로 다른 컴포넌트 또는 HTML 태그에 전달을 해주어야 하는 상황에서는 ?! ⇒ ...rest 문법 사용하기!**