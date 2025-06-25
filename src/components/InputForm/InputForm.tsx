import React from "react";
import {WeatherService} from "../../services/WeatherService.ts";

const InputForm = () => {
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const location = event.currentTarget.location.value.trim();
        WeatherService.getDataByCityName(location)
            .then(obj => {console.log("FORM RECEIVED: ", obj)});
    }
    return (
        <form onSubmit={onSubmit}>
            <input name = {"location"} id ={"input-location"} type={"text"}></input>
            <button id ={"get-weather"} type={"submit"}>Get weather!</button>
        </form>
    );
};

export default InputForm;