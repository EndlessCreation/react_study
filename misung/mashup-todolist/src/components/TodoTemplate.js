import React from 'react';
import styled from 'styled-components';

const TodoTemplateBlock = styled.div`
  width: 512px;
  height: 768px;

  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */

  margin-top: 96px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
`;

// 참고로 여기서 children 이라고 이름을 하지 않으면 제대로 동작 X
function TodoTemplate({ children }) {   // 이렇게 children 을 받는 이유는 후에 흰색 네모 위에 투두 리스트를 보여주기 위함이겠징!?
  return <TodoTemplateBlock>{children}</TodoTemplateBlock>;
}

export default TodoTemplate;