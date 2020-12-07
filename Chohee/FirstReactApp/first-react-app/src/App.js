import React, { Component, Fragment } from 'react';

function App() {
  // css 연습입니다.
  const style = {
    backgroundColor: 'pink',
    padding: '16px',
    color: 'white',
    fontSize: '12px'
  };

  return (
    // Fragment 연습입니다.
    <Fragment>
      <div className="App" style = {style}>
        {/* 주석 연습입니다. */}
        안뇽??
      </div>
      {
        // 삼항 연산자 연습입니다.
        1+1 === 2 ? <div>맞아~</div> : <div>틀렸어!</div>
      }
    </Fragment>
  );
}

export default App;
