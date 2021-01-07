import React, { useReducer, createContext, useContext, useRef }  from 'react';

const initialTodos = [
  {
    id: 1,
    text: '프로젝트 생성하기',
    done: true
  },
  {
    id: 2,
    text: '컴포넌트 스타일링하기',
    done: true
  },
  {
    id: 3,
    text: 'Context 만들기',
    done: false
  },
  {
    id: 4,
    text: '기능 구현하기',
    done: false
  }
];


function todoReducer(state, action) {
    switch (action.type) {
      case 'CREATE':  //생성되면, 기존의 상태에 추가
        return state.concat(action.todo);
      case 'TOGGLE':  //토글되면, 눌린것의 done 상태를 바꿔줌 
        return state.map(todo =>
          todo.id === action.id ? { ...todo, done: !todo.done } : todo
        );
      case 'REMOVE':  //삭제되면, filter로 제거함.
        return state.filter(todo => todo.id !== action.id);
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  }


// 두개의 context를 이용해 상태와 dispatch 를 따로 관리
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();  // 새로운 항목의 고유 ID


  export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(5);
    return (
        <TodoStateContext.Provider value={state}> 
          <TodoDispatchContext.Provider value={dispatch}>
            <TodoNextIdContext.Provider value={nextId}>
            {children}
            </TodoNextIdContext.Provider>
          </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
      );
  }

//useContext 를 사용하는 커스텀 Hook 을 만든다.
// context 를 바로 사용하지 않았다. 
// 나중에 사용할때, useTodoState , useTodoDispatch 를 바로 사용할수 있다.
// 언제 사용하느냐? 다른 컴포넌트에서 state 나 dispatch 를 사용하고 싶을때 사용한다.
// 커스텀 hook을 사용하여면 해당 컴포넌트가 TodoProvider 내부에 렌더링 되어있어야 함.

export function useTodoState() {
    const context = useContext(TodoStateContext);
    if (!context) {
      throw new Error('Cannot find TodoProvider');
    }
    return context;
  }
  
export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);
    if (!context) {
      throw new Error('Cannot find TodoProvider');
    }
    return context;
  }
  
export function useTodoNextId() {
    const context = useContext(TodoNextIdContext);
    if (!context) {
      throw new Error('Cannot find TodoProvider');
    }
    return context;
  }