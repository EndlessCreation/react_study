# 17. useCallback 사용해서 함수 재사용하기

✍🏻 [벨로퍼트씨의 모던 리액트 강좌 - 18편](https://react.vlpt.us/basic/18-useCallback.html) 을 참고하여 작성합니다.

## 1️⃣ What is useCallback?

* useCallback은 [16. useMemo를 사용해서 연산한 값 재사용하기](https://github.com/EndlessCreation/react_study/blob/main/Chohee/2020-12-21-16-useMemo-%EC%82%AC%EC%9A%A9%ED%95%B4%EC%84%9C-%EC%97%B0%EC%82%B0%ED%95%9C%EA%B0%92-%EC%9E%AC%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0.md) 에서 알아본 useMemo와 비슷한 Hook이다.
* useMemo는 특정 결과값을 재사용할 때 사용.
* __useCallback은 특정 함수를 재사용할 때 사용.__
* 문제 상황이 뭔가?
    
    * 계속 이어서 작성해오던 샘플 프로젝트의 App.js를 보면 함수들이 계속 생성되는 문제가 발생한다.

    * onChange, onToggle, onCreate, onRemove 함수는 컴포넌트가 리렌더링 될 때마다 __계속 다시 만들어진다.(재생성)__ 음 어떤 코드 흐름을 보고 재생성되는 상황임을 알 수 있지..?

        ~~~javascript
        // App.js
        const onChange = (e) => {
            const {name, value} = e.target; 
            setNewUserInputs({
            ...newUserInputs,
            [name] : value
            })
        }

        const onCreate = () => {
            const newUser = {
                id: nextId.current,
                username,
                nickname,
                active: false
            }
            setUsers(
                users.concat(newUser)
            )

            setNewUserInputs({
                username: '',
                nickname: ''
            })
            nextId.current += 1
        }
        
        const onRemove = id => {
            setUsers(users.filter(user => user.id !== id))
        }

        const onToggle = (id) => {
            setUsers(
            users.map(user => 
                user.id === id ? {...user, active: !user.active } : user
            )
            )
        }
        ~~~

    * 함수를 재사용해야 하는 이유는 메모리나 CPU 성능 상의 문제도 있지만 __나중에 컴포넌트에서 props가 바뀌지 않으면 Virtual DOM에 새로 렌더링하지 않고 컴포넌트를 재사용하는 최적화 작업을 할때도 함수 재사용이 필수__ 이기 때문.

## 2️⃣ useCallback 사용법

* 재사용할 함수를 useCallback()의 첫 번째 인자안에 넣는다.
* 재사용할 함수 안에 props나 상태값이 있으면 useCallback의 두 번째 인자인 deps 배열 안에 꼭 넣어야 한다.
    * props로 함수를 전달받아 온다면 deps 배열 안에 이 함수도 넣어야 한다.
* useCallback을 사용하여 재사용 가능한 함수로 바꿔준 모습
    ~~~javascript
    // App.js
    const onChange = useCallback((e) => {
        const {name, value} = e.target; 
        setNewUserInputs({
        ...newUserInputs,
        [name] : value
        })
    }, 
    [newUserInputs]);

    const onCreate = useCallback(() => {
        const newUser = {
        id: nextId.current,
        username,
        nickname,
        active: false
        }
        setUsers(
        users.concat(newUser)
        )

        setNewUserInputs({
        username: '',
        nickname: ''
        })
        nextId.current += 1
    },
    [users, username, nickname]);

    const onRemove = useCallback(id => {
        setUsers(users.filter(user => user.id !== id))
    },
    [users]);

    const onToggle = useCallback((id) => {
        setUsers(
        users.map(user => 
            user.id === id ? {...user, active: !user.active } : user
        )
        )
    },
    [users]);
    ~~~

## 3️⃣ 어떤 컴포넌트가 렌더링되고 있는지 눈으로 확인해보기

* __React DevTools__ 라는 걸 사용하면 된다.
* [링크](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=ko) 들어가서 확장 프로그램 설치 고고~
* <img width="326" alt="16" src="https://user-images.githubusercontent.com/31889335/103202285-57333480-4935-11eb-9165-919b1f886ac7.png">

    퍼즐모양 클릭해서 고정 핀 해두기
* 크롬 개발자 도구(옵션+커맨드+i) 들어가서 
    <img width="495" alt="17" src="https://user-images.githubusercontent.com/31889335/103203844-379e0b00-4939-11eb-8700-2e645670fbb7.png">
    
    Component 들어가면 위쪽에서 현재 프로젝트의 뷰를 리스트 형태로 볼 수도 있고, 아래 쪽의 hooks 부분에서는 React Hook 들의 상태를 실시간으로 체크할 수 있다.
* 근데 시각적으로 렌더링 어캐 확인함..??

> 흠 16, 17 다시 공부하기 ㅠㅠ