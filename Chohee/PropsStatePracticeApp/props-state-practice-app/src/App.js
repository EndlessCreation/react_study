import React from 'react';
import MyName from './components/MyName';
import Wrapper from './components/Wrapper';


function App() {
  
    return (
      <>
        <MyName name="김초희"></MyName>
        <Wrapper>
          <MyName name="김초희"></MyName>
        </Wrapper>
      </>
      
    ); 
}

export default App;
