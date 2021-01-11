# 2. CSS Module

## 1️⃣ CSS Module?

- **CSS 클래스가 중첩되는 것을 완벽히 방지**
- CSS Module로 사용할 때는, CSS 파일의 확장자를 **.module.css**로 하면됨
- 레거시 프로젝트시 유용
- 클래스 이름 짓는 규칙이 힘든 상황이거나 번거로울때 사용

- 필요한 라이브러리 : react-icons

### 👩‍💻 실습

**components/CheckBox.js**

```jsx
import React from 'react';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import styles from './CheckBox.module.css';

function CheckBox({ children, checked, ...rest }) {
  return (
    <div className={styles.checkbox}>
      <label>
        <input type="checkbox" checked={checked} {...rest} />
        <div className={styles.icon}>
          {checked ? (
            <MdCheckBox className={styles.checked} />
          ) : (
            <MdCheckBoxOutlineBlank />
          )}
        </div>
      </label>
      <span>{children}</span>
    </div>
  );
}

export default CheckBox;
```

**components/CheckBox.module.css**

```css
.checkbox {
    display: flex;
    align-items: center;
  }
  
  .checkbox label {
    cursor: pointer;
  }
  
  /* 실제 input 을 숨기기 위한 코드 */
  .checkbox input {
    width: 0;
    height: 0;
    position: absolute;
    opacity: 0;
  }
  
  .checkbox span {
    font-size: 1.125rem;
    font-weight: bold;
  }
  
  .icon {
    display: flex;
    align-items: center;
    /* 아이콘의 크기는 폰트 사이즈로 조정 가능 */
    font-size: 2rem;
    margin-right: 0.25rem;
    color: #adb5bd;
  }
  
  .checked {
    color: #339af0;
  }
```

**App.js**

```jsx
import React, {useState} from 'react';

import CheckBox from './components/CheckBox';

function App(){
  const [check, setCheck]=useState(false);
  const onChange = e => {
    setCheck(e.target.checked);
  };
  return(
    <div>
      <CheckBox onChange={onChange} checked = {check}>
        다음 약관에 모두 동의
      </CheckBox>
      <p>
        <b>check: </b>
        {check ? 'true' : 'false'}
      </p>
    </div>
  )
}

export default App;
```

## 2️⃣ classnames 의 bind 기능

- CSS 클래스 이름을 지정해 줄때 **cx(' 클래스 이름')**과 같은 형식으로 편하게 사용가능
- **여러개의 CSS 클래스를 사용해야하거나, 조건부 스타일링시** 더더욱 편리

- 필요한 라이브러리 : classnames

**components/CheckBox.js**

```jsx
import React from 'react';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import styles from './CheckBox.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function CheckBox({ children, checked, ...rest }) {
  return (
    <div className={cx('checkbox')}>
      <label>
        <input type="checkbox" checked={checked} {...rest} />
        <div className={cx('icon')}>
          {checked ? (
            <MdCheckBox className={cx('checked')} />
          ) : (
            <MdCheckBoxOutlineBlank />
          )}
        </div>
      </label>
      <span>{children}</span>
    </div>
  );
}

export default CheckBox;
```