# Weather Forecast App

This is a simple weather app made using HTML, CSS and JavaScript.
You can search for any city and see the current weather and the next 5 days forecast.

## Features

- Search weather by city name
- Shows temperature, humidity, wind speed, pressure and feels like temperature
- 5 day weather forecast
- Average forecast temperature
- Add and remove favorite cities
- Favorite cities are saved in local storage
- Loading and error message handling
- Responsive design for mobile and desktop

## Technologies Used

- HTML
- CSS
- JavaScript
- OpenWeatherMap API

## How to Run

1. Download or clone the project.
2. Get your API key from [OpenWeatherMap](https://openweathermap.org/api).
3. Open `js/api.js` and add your API key.
4. Open `index.html` in your browser.

You can also use Live Server in VS Code to run the project.

## Project Files

```text
index.html       Main HTML file
css/style.css    Styling file
js/api.js        API calls
js/app.js        Main app logic
js/storage.js    Favorite cities storage
```

## How It Works

Type a city name and click Search. The app gets current weather data and forecast data from OpenWeatherMap.
Click the star button to save a city in favorites. You can click any saved city to check its weather again.
