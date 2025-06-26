import React from "react";

type InputFormProps = {
    onSubmit: (city: string) => void;
}

const InputForm = ({onSubmit}: InputFormProps) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const location = event.currentTarget.location.value.trim();
        console.log("InputForm send: ", location);
        if (location) {
            onSubmit(location);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input name = {"location"} id ={"input-location"} type={"text"}></input>
            <button id ={"get-weather"} type={"submit"}>Get weather!</button>
        </form>
    );
};

export default InputForm;