import React from 'react';
import {createGlobalStyle} from 'styled-components';  // 글로벌 스타일을 추가하고 싶을 때 
import TodoTemplate from './components/TodoTemplate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';
import { TodoProvider } from './TodoContext';

const GlobaalStyle = createGlobalStyle`
body{
  background : #e9ecef;   /*회색*/
}
`;

function App(){
  return(
    <TodoProvider> 
    <GlobaalStyle/>
    <TodoTemplate>
      <TodoHead />
      <TodoList />
      <TodoCreate />
    </TodoTemplate>
    </TodoProvider>

  );
}

export default App;
