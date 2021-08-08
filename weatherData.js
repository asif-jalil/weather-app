import UI from "./ui.js";

const weatherData = {
    history: [],
    city: "",
    country: "",
    api_key: "026eaa58510fa593c3a01155a70a99d5",
    getWeather() {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&units=metric&appid=${this.api_key}`)
            .then((res) => res.json())
            .then((data) => UI.handleRemoteData(data))
            .catch((err) => UI.showMsg(err.message));
    },
};

export default weatherData;