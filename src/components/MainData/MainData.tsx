import WeatherDisplay from "../WeatherDisplay/WeatherDisplay.tsx";
import InputForm from "../InputForm/InputForm.tsx";

const MainData = () => {
    return (
        <div>
            <InputForm></InputForm>
            <WeatherDisplay></WeatherDisplay>
        </div>
    );
};

export default MainData;