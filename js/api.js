const API_KEY = "cda4fa97d1a936cec0f23de6f3fbb63d";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

async function getWeatherData(city, type) {
    const url = `${BASE_URL}/${type}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error(type === "weather" ? "City not found. Please check the city name." : "Forecast not available for this city.");
        }

        if (response.status === 401) {
            throw new Error("Invalid API key.");
        }

        throw new Error("Unable to fetch weather data.");
    }

    return response.json();
}

function getCurrentWeather(city) {
    return getWeatherData(city, "weather");
}

function getForecast(city) {
    return getWeatherData(city, "forecast");
}
