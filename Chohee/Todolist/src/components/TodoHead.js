import React from 'react';
import styled from 'styled-components';
import { useTodoState } from './TodoContext';

const TodoHeadStyle = styled.div`
    padding-top: 48px;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 24px;

    border-bottom: 1px solid #e9ecef;

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

    .task-left-count {
        margin-top: 40px;

        color: #20c997;
        font-size: 18px;
        font-weight: bold;
    }
`;

function TodoHead() {
    const todoState = useTodoState();
    const undoneTaskCount = todoState.filter(todo => !todo.done);

    const today = new Date();
    const dateString = today.toLocaleDateString('kr-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const dayName = today.toLocaleDateString('kr-KR', {
        weekday: 'long'
    });

    return(
        <TodoHeadStyle>
            <h1>{dateString}</h1>
            <div className="day">{dayName}</div>
            <div className="task-left-count">할 일 {undoneTaskCount.length}개 남음</div>
        </TodoHeadStyle>
    )
}

export default TodoHead;