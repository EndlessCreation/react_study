import React from 'react';
import HeartImogi from './components/HeartImogi';
import Hello from './components/Hello';
import Imogi from './components/Imogi';

function App() {
  return (
    // isSpecial에서 true는 자바스크립트이므로 {} 사용
    <>
      {/* 첫 번째 예제 */}
      <Hello color="red" name="김초희" isSpecial={true}></Hello>

      {/* 두 번째 예제 */}
      <Imogi isCheck={false}></Imogi>

      {/* 세 번째 예제 */}
      <HeartImogi isCheck> </HeartImogi>
    </>
    
  );
}

export default App;
