import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useTodoState } from './TodoContext';

const TodoListStyle = styled.div`
    flex: 1;
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-y: auto; // 리스트가 넘어가면 스크롤하기
`;

function TodoList() {
    const todoState = useTodoState();

    return(
        <TodoListStyle>
            {/* 모든 투두 항목에 대하여 적용 */}
            {todoState.map(todo => (
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    text={todo.text}
                    done={todo.done}>
                </TodoItem>
            ))}
        </TodoListStyle>
    )
}

export default TodoList;