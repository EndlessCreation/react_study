import React from 'react';
import styled from 'styled-components';

const TodoTemplateStyle = styled.div`
    width: 512px;
    height: 768px;
    margin: 0 auto;
    margin-top: 96px;
    margin-bottom: 32px;

    display: flex;
    flex-direction: column;
    position: relative;

    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);
`;

function TodoTemplate({ children }) {
    return(
        <TodoTemplateStyle>{children}</TodoTemplateStyle>        
    )
}

export default TodoTemplate;