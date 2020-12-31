# 24. componentDidCatch로 에러잡기

✍🏻 [벨로퍼트씨의 모던 리액트 강좌 - 26편](https://react.vlpt.us/basic/26-componentDidCatch-and-sentry.html) 을 참고하여 작성합니다.

## 1️⃣ What is componentDidcatch?

* 리액트 생명주기 메소드 중 하나이다.

* <img width="794" alt="18" src="https://user-images.githubusercontent.com/31889335/103352184-d9178f00-4ae8-11eb-9632-d4cffe56b980.png">

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

    > 이어서 작성하기