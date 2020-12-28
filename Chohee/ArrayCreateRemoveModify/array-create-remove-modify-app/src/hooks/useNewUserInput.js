import React, { useCallback, useState } from 'react';

function useNewUserInput(initialForm) {
    const [form, setForm] = useState(initialForm);

    const onChange = useCallback((e) => {
        const {name, value} = e.target;
        setForm(form => ({...form, [name]: value}));
    },[]);
    const reset = useCallback(() => {
        setForm(initialForm);
    },[initialForm]);

    return [form, onChange, reset];
}

export default useNewUserInput;