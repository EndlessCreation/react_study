import React from 'react';
import styled from 'styled-components';
import { useTodoState } from '../TodoContext';

const TodoHeadBlock = styled.div`{
    padding-top: 48px;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e9ecef;

    /*일반 html tag 를 이용하여 스타일 해주었다. (with CSS Selector) */
    h1 {
      margin: 0;
      font-size: 36px;
      color: #343a40;
    }
    .day {
      margin-top: 4px;
      color: #868e96;
      font-size: 21px;
    }
    .tasks-left {
      color: #20c997;
      font-size: 18px;
      margin-top: 40px;
      font-weight: bold;
    }
`;

function TodoHead(){
    const todos = useTodoState();   // 현재 가지고 있는state를 가져옴.
    const undoneTasks = todos.filter(todo => !todo.done);

    // 날짜 보여주기
    const today = new Date();
    const dateString = today.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });
    
    console.log(todos);  

    return (
        <TodoHeadBlock>
            <h1>{dateString}</h1>
            <div className="day">{dayName}</div>
            <div className="tasks-left">할 일 {undoneTasks.length}개 남음</div>

        </TodoHeadBlock>
    )
}

export default TodoHead;