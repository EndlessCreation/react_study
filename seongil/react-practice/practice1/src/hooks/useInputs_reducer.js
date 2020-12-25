import { useReducer, useCallback } from 'react';

function reducer(state, action) {
    switch (action.type) {
        case 'CANGE_INPUT':
            return {
                ...state,       
                [action.name] : action.value    //20장에선 initial state로 user와 inputs 속성이
                                                //둘다 있어서 inputs : { } 을 따로 지정해줬지만
                                                //여기선 initialForm에 inputs만 있어서 따로 지정해줄
                                                //필요는 없다
            };
        case 'RESET':
            return Object.keys(state).reduce((acc, current) => {
                acc[current] = ' ';
                return acc;
            }, {});
        default:
            return state;
    }
}

function useInputs(initialForm) {
    const [form, dispatch] = useReducer(reducer, initialForm);
    //change
    const onChange = useCallback(e => {
        const { name, value } = e.target;
        dispatch({
            type: 'CANGE_INPUT',
            name,
            value
        });
    }, []);
    const reset = useCallback(() => 
        dispatch({
            type: 'RESET',
        })
    , []);
    return [form, onChange, reset];
};

export default useInputs;