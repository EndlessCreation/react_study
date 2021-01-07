import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useTodoState } from '../TodoContext';

const TodoListBlock = styled.div`
  flex: 1;   /*자신이 차지할수 있는 영역을 꽉 채우도록*/
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
  /* background: gray;  사이즈 조정이 잘 되고 있는지 확인하기 위한 임시 스타일 */
`;

function TodoList() {
    const todos = useTodoState();   // 현재 투두리스트의 상태르루 받아서~

    // 여기서 하나씩 렌더링
    return (
    <TodoListBlock> 
       {todos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          done={todo.done}
        />
      ))}
    </TodoListBlock>
    );
    }

export default TodoList;