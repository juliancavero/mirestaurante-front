import React, { useState } from "react";

export function useForm (callback: any, initialState = {}) {

    const [values, setValues] = useState(initialState);

    function onChangeInput(event: React.ChangeEvent<HTMLInputElement>){
        setValues({...values, [event.target.name] : event.target.value });
    }
    function onChangeSelect(event: React.ChangeEvent<HTMLSelectElement>){
        setValues({...values, [event.target.name] : event.target.value });
    }

    async function onSubmit(event: React.FormEvent<HTMLFormElement>){
        await callback();
    }

    return {
        onChangeInput,
        onChangeSelect,
        onSubmit,
        values
    }
}