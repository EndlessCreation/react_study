import React from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';
import { useTodoDispatch } from './TodoContext';

// 체크 박스 스타일
const CheckCircleStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 32px;
    height: 32px;
    margin-right: 20px;

    border-radius: 50%;
    border: 1px solid #ced4da;
    font-size: 24px;

    cursor: pointer;

    // 인자(props) 중 done이라는 값이 true일 때 색 바꿈
    ${props => props.done && css`
        border: 1px solid #38d9a9;
        color: #38d9a9;
    `}
`;

// 투두 내용 스타일
const TextStyle = styled.div`
    flex: 1;
    
    font-size: 21px;
    color: #495057;

    ${props => props.done && css`
        color: #ced4da;
    `}
`;

// 휴지통 스타일
const RemoveStyle = styled.div`
    // 아래 3개 - 수평수직 중앙 정렬
    display: flex;
    align-items: center;
    justify-content: center;

    opacity: 0; // 투명도 100% (안 보임)

    color: #dee2e6;
    font-size: 24px;

    cursor: pointer;

    // 휴지통 아이콘에 커서를 올리면 빨간색으로 바꿈
    &:hover {
        color: #ff6b6b;
    }
`;

// 휴지통, 체크버튼, 투두내용을 포함하는 박스 스타일
const TodoItemStyle = styled.div`
    display: flex;
    align-items: center;

    padding-top: 12px;
    padding-bottom: 12px;

    // 투두리스트의 각 아이템에 커서를 올렸을 때 휴지통 모양 아이콘이 활성화 됨
    // selector로 컴포넌트를 사용할 수 있음
    &:hover {
        ${RemoveStyle} {
            opacity: 1; // 투명도 0% (보임)
        }
    }
`;

function TodoItem({ id, done, text}) {
    const dispatch = useTodoDispatch();
    const onToggle = () => 
        dispatch({
            type: 'TOGGLE',
            id
        });
    const onRemove = () => 
        dispatch({
            type: 'REMOVE',
            id
        })

    return(
        <TodoItemStyle>
            <CheckCircleStyle onClick={onToggle} done={done}>{done && <MdDone />}</CheckCircleStyle>
            <TextStyle done={text}>{text}</TextStyle>
            <RemoveStyle onClick={onRemove}><MdDelete /></RemoveStyle>
        </TodoItemStyle>
    )
}

export default TodoItem;