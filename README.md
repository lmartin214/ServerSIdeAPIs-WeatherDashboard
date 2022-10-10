# Weather Dashboard

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Tech Stack

**Code Languages:** This app will run in the browser with the help of BootStrap framework. While featuring dynamically updated HTML and CSS powered by JavaScript.
Time and date powered by Moment.JS. Weather data gathered with OpenWeather API.

## API Reference

#### NASA Image and Video Library

```http
  https://openweathermap.org/api/${4abe6053f0c1aa8a76f221372c2666a2}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `lat, lon` | `string` | `Geographical coordinates (latitude, longitude) ` |
| `units` | `string` | `Terms to search for in “Keywords” fields. Separate multiple values with commas.` |
| `city` | `string` | `search for a city.` |
| `wind speed` | `string` | `Speed for the wind currently.` |

#### 





## Deployment

https://lmartin214.github.io/ServerSIdeAPIs-WeatherDashboard/  
https://github.com/lmartin214/ServerSIdeAPIs-WeatherDashboard

## Screenshot

![dashboardScreenShot](https://user-images.githubusercontent.com/107451001/194844627-ea8b5290-0b1e-433d-9116-35efdc0b1707.png)

