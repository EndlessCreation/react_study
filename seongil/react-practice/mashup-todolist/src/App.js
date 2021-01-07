import React, { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import TodoTemplate from "./components/TodoTemplate";
import TodoHead from "./components/TodoHead";
import TodoList from "./components/TodoList";
import TodoCreate from "./components/TodoCreate";
import { TodoProvider } from "./TodoContext";
import { authService } from "./fbase";
import Auth from "./routes/Auth";

const GlobalStyle = createGlobalStyle`
  body{
    background: #e9ecef;
  }
`;

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          uid: user.uid,
        });
      } else {
        setUserObj((prev) => null);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        Boolean(userObj) ? (
          <TodoProvider>
            <GlobalStyle />
            <TodoTemplate>
              <TodoHead />
              <TodoList />
              <TodoCreate userId={userObj.uid} />
            </TodoTemplate>
          </TodoProvider>
        ) : (
          <Auth />
        )
      ) : (
        "initializing"
      )}
    </>
  );
}

export default App;
