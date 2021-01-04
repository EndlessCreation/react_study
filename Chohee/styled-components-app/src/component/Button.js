import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.div`
    display: inline-flex;
    outline: none;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    padding-left: 1rem;
    padding-right: 1rem;

    /* 크기 */
    height: 2.25rem;
    font-size: 1rem;

    /* 색상 */
    background: skyblue;
    &:hover {
        background: darkblue;
    }
    $:active {
        background: black;
    }
`;

function Button() {

    return(
        <StyledButton />
    )
}

export default Button;