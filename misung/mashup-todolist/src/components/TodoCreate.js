import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { useTodoDispatch, useTodoNextId } from '../TodoContext';

const CircleButton = styled.button`
  background: #38d9a9;
  &:hover {  /*올려두면 색이 연해짐*/
    background: #63e6be;
  }
  &:active {      /*a:active : 링크를 마우스로 클릭한 순간*/
    background: #20c997;   /*클릭하면 색이 진해짐.*/
  }

  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.125s all ease-in;
  ${props =>
    props.open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

function TodoCreate() {

 //useState 를 사용하여 토글 할 수 있는 open 값을 관리! 
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const dispatch = useTodoDispatch();  // 상태 받아오기
  const nextId = useTodoNextId();   // 상태 받아오기
 

  const onToggle = () => setOpen(!open); // 눌리면 상태 바꾸기
  const onChange = e => setValue(e.target.value);  //event 가 일어난 곳의 value 를 바꾸기
  const onSubmit = e =>{
    e.preventDefault(); // 새로고침 방지
    dispatch({
      type:'CREATE',
      todo:{
        id:nextId.current,
        text :value,
        done: false
      }
    });
    setValue('');  // value 값은 비워주고~
    setOpen(false);  // 새롭게 생성되면 toggle 이 눌리지 않은 상태
    nextId.current+=1; // 아이디 바꿔주기
  };

  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmit}>
            <Input 
            autoFocus 
            placeholder="할 일을 입력 후, Enter 를 누르세요" 
            onChange={onChange}
            value={value}
            />
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  );
}

export default React.memo(TodoCreate);