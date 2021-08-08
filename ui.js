import weatherData from "./weatherData.js";
import storage from "./storage.js";

const UI = {
    loadSelector() {
        const weatherForm = document.querySelector("#weatherForm");
        const countryInput = document.querySelector("#countryInput");
        const cityInput = document.querySelector("#cityInput");
        const weatherResult = document.querySelector("#weatherResult");
        const cloudIconEl = document.querySelector("#cloudIconEl");
        const placeEl = document.querySelector("#placeEl");
        const tempEl = document.querySelector("#tempEl");
        const weatherEl = document.querySelector("#weatherEl");
        const humidityEl = document.querySelector("#humidityEl");
        const pressureEl = document.querySelector("#pressureEl");
        const alertToast = document.querySelector("#alertToast");
        const alertMsg = document.querySelector("#alertMsg");
        const historyContainer = document.querySelector("#historyContainer");
        const historyTrigger = document.querySelector("#historyTrigger");
        const historyEmptyAlert = document.querySelector("#historyEmptyAlert");

        return {
            weatherForm,
            countryInput,
            cityInput,
            weatherResult,
            cloudIconEl,
            placeEl,
            tempEl,
            weatherEl,
            humidityEl,
            pressureEl,
            alertToast,
            alertMsg,
            historyContainer,
            historyTrigger,
            historyEmptyAlert,
        };
    },
    loadHistory() {
        const { historyEmptyAlert } = this.loadSelector();
        storage.getData();
        if (weatherData.history.length > 0) {
            weatherData.history.forEach((item) => {
                this.displayHistoryItem(item);
            });
        } else {
            historyEmptyAlert.classList.remove("d-none");
        }
    },
    displayHistoryItem(data) {
        const { historyContainer, historyEmptyAlert } = this.loadSelector();
        const { cityName, temp, weather, humidity, pressure, icon, time } = data;
        if (!historyEmptyAlert.classList.contains("d-none")) {
            historyEmptyAlert.classList.add("d-none");
        }

        let div = document.createElement("div");
        div.classList.add("history-item");
        div.innerHTML = `
            <div class="history-item-heading">
                <h3 class="history-place">${cityName}</h3>
                <p class="history-date">${moment(time).format("MMM Do YY, hh:mm a")}</p>
            </div>
            <div class="history-item-body">
                <div class="history-icon">
                    <img src="https://openweathermap.org/img/w/${icon}.png"></img>
                </div>
                <div class="history-details">
                    <h3 class="history-temp">${temp}&deg;C</h3>
                    <h6 class="history-weather">${weather}</h6>
                    <p>Humidity: <span class="history-humidity">${humidity}%</span> <span class="mx-2">|</span> Pressure: <span class="history-pressure">${pressure}hPa</span></p>
                </div>
            </div>
        `;

        historyContainer.insertAdjacentElement("afterbegin", div);
    },
    showMsg(msg) {
        const { alertToast, alertMsg } = this.loadSelector();
        const icon = `<i class="fas fa-times-circle"></i>`;
        alertMsg.innerHTML = icon + " " + msg;

        const toast = new bootstrap.Toast(alertToast, {
            delay: 2500,
        });
        toast.show();
    },
    checkValidity(city) {
        if (city === "") {
            return false;
        } else {
            return true;
        }
    },
    getInputValue() {
        const { countryInput, cityInput } = this.loadSelector();
        const countryInputValue = countryInput.value.trim();
        const cityInputValue = cityInput.value.trim();
        const isValid = this.checkValidity(cityInputValue);

        if (isValid) {
            // set city and country to weather data
            weatherData.city = cityInputValue;
            weatherData.country = countryInputValue;

            // this.handleRemoteData();
            weatherData.getWeather();
        } else {
            // show alert message
            this.showMsg("Error! Please enter your city.");
        }
    },
    resetInput() {
        const { weatherForm } = this.loadSelector();
        weatherForm.reset();
    },
    addToHistory(data) {
        weatherData.history.push(data);
        storage.saveData(weatherData.history);
        this.displayHistoryItem(data);
    },
    displayWeatherReport(data) {
        const { weatherResult, placeEl, tempEl, cloudIconEl, weatherEl, humidityEl, pressureEl, historyContainer, historyTrigger } =
            this.loadSelector();
        const { main, name: cityName, weather } = data;

        if (window.innerWidth < 992 && historyContainer.classList.contains("show")) {
            historyContainer.classList.remove("show");
            historyTrigger.classList.remove("active");
        }

        // Display on UI
        placeEl.textContent = cityName;
        tempEl.innerHTML = main.temp + " &deg;C";
        weatherEl.textContent = weather[0].main;
        humidityEl.textContent = main.humidity + "%";
        pressureEl.textContent = main.pressure + "hPa";
        cloudIconEl.setAttribute("src", `https://openweathermap.org/img/w/${weather[0].icon}.png`);
        weatherResult.classList.remove("d-none");

        // Taking data for history
        const now = moment();
        const historyData = {
            cityName,
            temp: main.temp,
            weather: weather[0].main,
            humidity: main.humidity,
            pressure: main.pressure,
            icon: weather[0].icon,
            time: now,
        };
        this.addToHistory(historyData);
    },
    handleRemoteData(data) {
        const { cod, message } = data;

        if (cod === "404") {
            this.showMsg(message);
        } else {
            this.displayWeatherReport(data);
        }
    },
    init() {
        const { weatherForm, historyTrigger, historyContainer } = this.loadSelector();

        weatherForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this.getInputValue();
            this.resetInput();
        });

        historyTrigger.addEventListener("click", () => {
            historyContainer.classList.toggle("show");
            historyTrigger.classList.toggle("active");
        });

        window.addEventListener("DOMContentLoader", this.loadHistory());
    },
};

export default UI;