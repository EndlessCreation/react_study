import React, { useCallback, useMemo, useReducer, useRef, useState } from 'react'
import CreateUser from './components/CreateUser';
import UserList from './components/UserList'
import useNewUserInput from './hooks/useNewUserInput';
import useNewUser from './hooks/useNewUserInput';

function countActiveUsers(users) {
  console.log('활성 사용자 수 세는 중..');
  return users.filter(user => user.active === true).length;
}

// useReducer로 관리할 상태 초기값
const initialState = {
  newUserInputs: {
    username: '',
    nickname: ''
  },
  users: [
    {
        id: 1,
        username: '김초희',
        nickname: '초밥',
        active: true
    },
    {
        id: 2,
        username: '김미성',
        nickname: '킴마성',
        active: true
    },
    {
        id: 3,
        username: '김건훈',
        nickname: '노루참치',
        active: false
    },
    {
        id: 4,
        username: '조인혁',
        nickname: '오함마',
        active: true
    },
    {
        id: 5,
        username: '신성일',
        nickname: '로봇',
        active: false
    }
  ]
}

function reducer(state, action) {
  switch(action.type) {
    case 'CREATE_USER':
      return {
        users: state.users.concat(action.user)
      }
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map(user => user.id === action.id ? {...user, active: !user.active} : user)
      }
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      }
    default:
      return state;
  }
}

export const UserDispatch = React.createContext(null);

function App() {
  const [{ username, nickname }, onChange, reset] = useNewUserInput({
    username: '',
    nickname: ''
  });
  
  const [state, dispatch] = useReducer(reducer, initialState);

  const { users } = state;

  const nextId = useRef(6);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        nickname
      }
    });
    
    reset();
    nextId.current += 1;
  },
  [username, nickname, reset]);

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <div>리액트 스터디원들이 누구누구있겡👩🏻‍💻👨🏻‍💻</div>
      <div>별명두 맞춰바~~!</div>
      
      <UserDispatch.Provider value={dispatch}>
        <CreateUser />
        <UserList users={users} />
        <div>스터디에 활발히 참여하고 있는 사람 수는?: <b>{count}</b> 명!</div>
      </UserDispatch.Provider>
    </>
  );
}



export default App;
