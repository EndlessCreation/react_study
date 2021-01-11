import React, { useReducer, createContext, useContext, useRef } from 'react';

const initTodos = [
    {
        id: 1,
        text: "오전 10시 오퍼스 회의",
        done: true
    },
    {
        id: 2,
        text: "오후 10시 소마 멘토링",
        done: false
    },
    {
        id: 3,
        text: "오후 9시 프로그라피 회의",
        done: false
    },
    {
        id: 4,
        text: "오퍼스 작업 (오전 10시 ~ 오후 3시)",
        done: true
    },
    {
        id: 5,
        text: "코틀린으로 알고리즘 문제 풀기",
        done: false
    }
];


/* dispatch로 발생시킬 액션들
* CREATE
* TOGGLE
* REMOVE
*/
function TodoReducer(state, action) {
    switch (action.type) {
        case 'CREATE' :
            // action 안에 todo 항목을 넣어서 디스패치해줌
            return state.concat(action.todo);
        case 'TOGGLE' :
            // 모든 투두 항목에 대하여 상태를 업데이트해줌
            return state.map(
                // 아래 코드는 삼항 연산자임
                // 투두 id가 action으로 받아온 id랑 같다면 해당 투두의 done 값을 반전시켜줌
                todo => todo.id === action.id ? { ...todo, done: !todo.done } : todo
            )
        case 'REMOVE' :
            // 모든 투두 항목들에 대하여 투두 id랑 action으로 받아온 id랑 일치하지 않는 것들만 가져옴
            return state.filter(todo => todo.id !== action.id);
        default:
            throw new Error('Unhandled action type');
    }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoContext({ children }) {
    // todoReducer 사용을 위한 선언
    const [state, dispatch] = useReducer(TodoReducer, initTodos);
    const nextId = useRef(6);

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

// 다른 파일에서도 이 파일에서 만든 Context 값을 사용할 수 있게 하기 위함
export function useTodoState() {
    const context = useContext(TodoStateContext);
    // 예외처리
    if(!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);
    // 예외처리
    if(!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoNextId() {
    const context = useContext(TodoNextIdContext);
    // 예외처리
    if(!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}