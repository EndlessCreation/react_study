# 24. componentDidCatch로 에러잡기

✍🏻 [벨로퍼트씨의 모던 리액트 강좌 - 26편](https://react.vlpt.us/basic/26-componentDidCatch-and-sentry.html) 을 참고하여 작성합니다.

## 1️⃣ What is componentDidcatch?

* 리액트 생명주기 메소드 중 하나이다.

* <img width="794" alt="18" src="https://user-images.githubusercontent.com/31889335/103352184-d9178f00-4ae8-11eb-9632-d4cffe56b980.png">

* 이 메소드는 파라미터를 2개 가지고 있고, 컴포넌트가 렌더링되는 도중 런타임 에러가 발생하면 호출되는 콜백 메소드이다.

## 2️⃣ componentDidCatch 사용하여 리액트 애플리케이션에서 발생하는 에러 처리하기

* 프로젝트 새로 만들기

* 에러가 발생하는 상황 만들기

    * User 컴포넌트 만들기

    *   ~~~javascript
        // User.js
        function User({ user }) {
            return (
                <div>
                    <div>
                        <b>ID : </b>{user.id}
                    </div>
                    <div>
                        <b>Username : </b>{user.username}
                    </div>
                </div>
            )
        }
        ~~~

    * App 컴포넌트 만들기

    *   ~~~javascript
        // App.js
        function App() {
            const user = {
                id: 1,
                username: '김초희'
            };

            return (
                <>
                <User user={user}/>
                </>
            );
        }
        ~~~
    
    * <img width="358" alt="19" src="https://user-images.githubusercontent.com/31889335/103353565-8b9d2100-4aec-11eb-956c-798019885b22.png">

    * 만약? App.js에서 User 컴포넌트에 props를 전달하지 않는다면?

    *   ~~~javascript
        function App() {
            const user = {
                id: 1,
                username: '김초희'
            };

            return (
                <>
                    {/* props를 전달하지 않은 경우 */}
                    <User />
                </>
            );
        }
        ~~~

    * <img width="726" alt="20" src="https://user-images.githubusercontent.com/31889335/103353709-dc147e80-4aec-11eb-8932-f6f75979c580.png">

    * 에러가 발생하게 된다!

* 에러 방지하기

    * User 컴포넌트에서 null checking을 하면 된다.

    *   ~~~javascript
        // User.js
        function User({ user }) {
            // null checking (null이면 JSX를 return 하는게 아니라 null을 리턴)
            if(!user) {
                return null;
            }

            return (
                <div>
                    <div>
                        <b>ID : </b>{user.id}
                    </div>
                    <div>
                        <b>Username : </b>{user.username}
                    </div>
                </div>
            )
        }
        ~~~

* 사전에 예외처리 하지 않은 에러가 발생했을 때 componentDidCatch 사용하여 예외 처리하기

    * src 폴더에 ErrorBoundary.js 라는 컴포넌트 만들기

    *   ~~~javascript
        // ErrorBoundary.js
        import React, { Component } from 'react';

        class ErrorBoundary extends Component {
            state = {
                error: false
            };

            componentDidCatch(error, info) {
                console.log('에러가 발생했습니다!')
                console.log({
                    error,
                    info
                });
                this.setState({
                    error: true
                })
            }

            // componentDidCatch에 의해 error가 true가 될 경우, 에러 발생을 나타내고 그렇지 않을 경우 this.props.children을 리턴.
            render() {
                if(this.state.error) {
                    return <h1>에러 발생!!!</h1>;
                }else {
                    return this.props.children;
                }
            }
        }

        export default ErrorBoundary;
        ~~~

    * componentDidCatch() 메소드

        * 첫 번째 인자 : 에러의 내용 전달

        * 두 번째 인자 : 에러가 발생한 위치 전달

    * App컴포넌트에서 ErrorBoundary 컴포넌트가 User 컴포넌트를 감싸도록 작성하기(User props를 임의적으로 작성하지 않고!)

        *   ~~~javascript
            // App.js
            ...

            return (
                <ErrorBoundary>
                    <User />
                </ErrorBoundary>
            );
            ~~~

        * User 컴포넌트의 null checking 코드는 주석처리 해주자.

    * 이렇게 하면 브라우저에 에러 화면은 나타나겠지만 X 버튼 누르면 에러 발생! 문구가 나오게 된다.

    * <img width="785" alt="21" src="https://user-images.githubusercontent.com/31889335/103455321-6b10d900-4d2f-11eb-806f-5b260aacb374.png">

    * <img width="400" alt="22" src="https://user-images.githubusercontent.com/31889335/103455334-7ebc3f80-4d2f-11eb-98ed-2e53f2936e75.png">

    * <img width="486" alt="23" src="https://user-images.githubusercontent.com/31889335/103455353-a4e1df80-4d2f-11eb-90ec-3dd0a8a41d73.png">

    * 그리고 구글 개발자 콘솔을 보면 위 그림처럼 componentDidCatch 함수에서 정의해준 error 내용과 error 발생 위치를 확인할 수 있다.

    * User 컴포넌트에서 null checking을 하지 않았음에도 BoundaryError 컴포넌트의 componentDidCatch() 함수에 의해 에러가 캐치된 모습이다.

## 3️⃣ Sentry 연동하기

* componentDidCatch로 사용자에게 에러가 발생했음을 알려줄 수 있지만 에러가 발생했다는 것을 알려주는 것은 사용자에게 좋지 않은 경험을 주는 것이다.

* 즉, 개발자만 에러 발생 부분을 얼른 보고 수정할 수 있어야 한다.

* componentDidCatch()에 의해 사용자가 웹 서비스를 사용하면서 마주친 에러 정보를 사용자에게 보여주지 않고 개발자만 볼 수 있는 다른 곳으로 전송해주면 된다.

* [Sentry](https://sentry.io/welcome/) 라는 서비스를 사용하면 이 작업을 쉽게 할 수 있다.

* 회원가입 하고, 새로운 프로젝트 만들 때 React 사용한다고 체크한 후, Sentry를 우리 프로젝트에 적용하면 된다.

* 프로젝트 폴더에서 yarn add @sentry/react @sentry/tracing 명령어 작성 후, index.js에 sentry 페이지에서 하라는 대로 코드를 작성하면 된다.

* 그 후, 리액트 앱을 새로고침하면 아래와 같이 Sentry로 에러가 날라오게 된다!

* <img width="911" alt="24" src="https://user-images.githubusercontent.com/31889335/103455586-bf1cbd00-4d31-11eb-8007-fe0856700413.png">

* 그런데 여기까지 하면 리액트 앱을 개발자모드로 돌렸을 때 Sentry로 에러가 잘 날라오지만 나중에 배포용 앱으로 돌렸을 때는 Sentry로 날라오지 않는다.

* ErrorBoundary에 추가 작업을 해줘야한다.

*   ~~~javascript
    import React, { Component } from 'react';
    // 1. import 추가
    import * as Sentry from '@sentry/browser';

    class ErrorBoundary extends Component {
        state = {
            error: false
        };

        componentDidCatch(error, info) {
            console.log('에러가 발생했습니다!')
            console.log({
                error,
                info
            });
            this.setState({
                error: true
            })
            // 2. 아래 코드 추가
            // 현재 배포용 프로젝트인지 아닌지 체크 코드
            if (process.env.NODE_ENV === 'production') {
                Sentry.captureException(error, { extra: info });
            }
        }

        render() {
            if(this.state.error) {
                return <h1>에러 발생!!!</h1>;
            }else {
                return this.props.children;
            }
        }
    }

    export default ErrorBoundary;
    ~~~

* 배포용 프로젝트에서도 Sentry에 에러가 잘 날라오는지 확인하기

    * 프로젝트 폴더에서 yarn build 명령어 작성

    * build 폴더가 생성되면 build 폴더에 있는 파일들을 서버에서 실행할 수 있도록 하기 위해서 npx serve ./build 명령어를 작성하기

    * <img width="445" alt="25" src="https://user-images.githubusercontent.com/31889335/103455731-c09ab500-4d32-11eb-8316-006c9c1b384e.png">

    * http://localhost:5000/ 로 들어가서 에러가 발생했을 때 Sentry에 에러가 잘 날아오는지 확인하면 된다!

# 끝!