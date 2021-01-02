# 25. 리액트 개발을 할 때 사용하면 편한 Prettier, ESLint, Snippet

## 1️⃣ VS code에 연동해서 사용하면 좋은 것들

- **[Prettier](https://prettier.io/)**

  - 자동으로 코드의 스타일을 관리해주는 도구

  - 문자열 사용시 '(작은 따옴표)를 쓸지 "(큰 따옴표)를 쓸지 통일해주고,

  - 세미콜론을 코드 맨 뒤에 붙일지 말지 통일해주고,

  - 들여쓰기는 얼마나 할지 통일해주고,

  - 즉, 코드 스타일을 마음대로 커스텀할 수 있게 해준다.

  - CSS 코드 스타일도 관리 가능하다.

  - Prettier를 에디터랑 연동해서 사용하는게 편하다.

    - 새 프로젝트 만들기

    - UsefulTools 폴더에 useful-tools-app 프로젝트를 만듬

    - 프로젝트의 root 디렉터리에 .prettierrc 라는 파일을 만들자.

    - ```javascript
      // .prettierrc 파일
      {
          "trailingComma": "es5",
          "tabWidth": 4,
          "semi": false,
          "singleQuote": true
      }
      ```

      위 코드를 작성한다.

      들여쓰기, 세미콜론 유무, 따옴표 종류 등을 정해주는 코드이다.

    - [여기](https://prettier.io/docs/en/options.html) 에서 더 다양한 속성들을 정해줄 수 있다.

    - .prettierrc 파일을 만들었다면 vs code에서 prettier 을 설치하자.

    - <img width="911" alt="26" src="https://user-images.githubusercontent.com/31889335/103456076-276d9d80-4d36-11eb-8cf2-a8c3606da712.png">

    - 맥에서 **커맨트 + ,** 를 눌러서 Format On Save를 검색해서 아래와 같이 체크한다.

    - <img width="536" alt="27" src="https://user-images.githubusercontent.com/31889335/103456099-61d73a80-4d36-11eb-93df-5b7c9dc174f1.png">

* __ESLint__

    [여기서 확인하자^^](https://react.vlpt.us/basic/27-useful-tools.html)

* __Snippet__

    [여기서 확인하자^^](https://react.vlpt.us/basic/27-useful-tools.html)

# 끝!