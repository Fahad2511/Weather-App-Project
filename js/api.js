const API_KEY = "YOUR_API_KEY_HERE";
const BASE_URL = "WEATHER_URL_HERE";

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
