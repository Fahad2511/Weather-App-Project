const $ = id => document.getElementById(id);

const searchForm = $("searchForm");
const cityInput = $("cityInput");
const loading = $("loading");
const errorMessage = $("errorMessage");
const currentWeather = $("currentWeather");
const forecastSection = $("forecastSection");
const favoritesContainer = $("favoritesContainer");
const favoriteButton = $("favoriteButton");

let currentCity = "";

searchForm.addEventListener("submit", event => {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (!city) {
        showError("Please enter a city name.");
        return;
    }

    loadWeather(city);
});

favoriteButton.addEventListener("click", () => {
    if (!currentCity) return;

    isFavorite(currentCity) ? removeFavorite(currentCity) : saveFavorite(currentCity);
    updateFavoriteButton();
    displayFavorites();
});

favoritesContainer.addEventListener("click", event => {
    const cityButton = event.target.closest(".city-button");
    const removeButton = event.target.closest(".remove-favorite");

    if (cityButton) loadWeather(cityButton.dataset.city);

    if (removeButton) {
        removeFavorite(removeButton.dataset.city);
        displayFavorites();
        updateFavoriteButton();
    }
});

async function loadWeather(city) {
    loading.classList.remove("hidden");
    errorMessage.classList.add("hidden");

    try {
        const [currentData, forecastData] = await Promise.all([
            getCurrentWeather(city),
            getForecast(city)
        ]);

        displayCurrentWeather(currentData);
        displayForecast(forecastData);
        cityInput.value = "";
    } catch (error) {
        showError(error.message);
        currentWeather.classList.add("hidden");
        forecastSection.classList.add("hidden");
    } finally {
        loading.classList.add("hidden");
    }
}

function displayCurrentWeather(data) {
    const { name, sys, weather, main, wind } = data;
    const condition = weather[0];

    $("cityName").textContent = `${name}, ${sys.country}`;
    $("weatherDescription").textContent = condition.description;
    $("weatherIcon").src = `https://openweathermap.org/img/wn/${condition.icon}@2x.png`;
    $("weatherIcon").alt = condition.description;
    $("temperature").textContent = Math.round(main.temp);
    $("humidity").textContent = `${main.humidity}%`;
    $("windSpeed").textContent = `${wind.speed} m/s`;
    $("feelsLike").textContent = `${Math.round(main.feels_like)}\u00B0C`;
    $("pressure").textContent = `${main.pressure} hPa`;

    currentCity = name;
    currentWeather.classList.remove("hidden");
    updateFavoriteButton();
}

function displayForecast(data) {
    const dates = new Set();
    const dailyForecast = data.list.filter(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toDateString();
        const isDaytime = date.getHours() >= 9 && date.getHours() <= 18;

        if (!isDaytime || dates.has(day)) return false;

        dates.add(day);
        return true;
    }).slice(0, 5);

    const average = dailyForecast.reduce((total, item) => total + item.main.temp, 0) / dailyForecast.length;
    $("averageTemperature").textContent = `${Math.round(average)}\u00B0C`;
    $("forecastContainer").innerHTML = dailyForecast.map(createForecastCard).join("");
    forecastSection.classList.remove("hidden");
}

function createForecastCard(item) {
    const date = new Date(item.dt * 1000);
    const condition = item.weather[0];
    const day = date.toLocaleDateString("en-US", { weekday: "short" });

    return `
        <div class="forecast-card">
            <div class="forecast-day">${day}</div>
            <img src="https://openweathermap.org/img/wn/${condition.icon}@2x.png" alt="${condition.description}">
            <div class="forecast-temperature">${Math.round(item.main.temp)}&deg;C</div>
            <div class="forecast-description">${condition.description}</div>
            <div class="forecast-humidity">Humidity: ${item.main.humidity}%</div>
        </div>
    `;
}

function updateFavoriteButton() {
    const favorite = isFavorite(currentCity);
    favoriteButton.textContent = favorite ? "\u2605" : "\u2606";
    favoriteButton.title = favorite ? "Remove from favorites" : "Add to favorites";
}

function displayFavorites() {
    const favorites = getFavorites();

    favoritesContainer.innerHTML = favorites.length
        ? favorites.map(city => `
            <div class="favorite-city">
                <button class="city-button" data-city="${city}">${city}</button>
                <button class="remove-favorite" data-city="${city}" title="Remove">&times;</button>
            </div>
        `).join("")
        : '<p class="empty-message">No favorite cities yet.</p>';
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
}

displayFavorites();
