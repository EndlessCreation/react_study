import React from 'react';
import styled, { css } from 'styled-components';
import Button from './component/Button';

const Circle1 = styled.div`
  width: 5rem;
  height: 5rem;
  background: black;
  border-radius: 50%;
`;

const Circle2 = styled.div`
  width: 5rem;
  height: 5rem;
  background: ${props => props.color || 'black'};
  border-radius: 50%;
`;

const Circle3 = styled.div`
  width: 5rem;
  height: 5rem;
  background: ${props => props.color || 'black'};
  border-radius: 50%;
  ${props =>
    props.huge && css`
      width: 10rem;
      height: 10rem;
    `
  };
`;

function App() {
  return (
    <>
      <Circle1 />
      <Circle2 color="blue"/>
      <Circle3 color="pink" huge />
      <Button />
    </>
  );
}

export default App;
