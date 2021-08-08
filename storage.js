import weatherData from "./weatherData.js";

const storage = {
    getData() {
        const data = JSON.parse(localStorage.getItem("weather-history"));
        if (data) {
            weatherData.history = JSON.parse(JSON.stringify(data));
        } else {
            weatherData.history = [];
        }
    },
    saveData(data) {
        localStorage.setItem("weather-history", JSON.stringify(data));
    },
};

export default storage