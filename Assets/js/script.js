// API key. Imperial unit indicates that the temperature is received in Fahrenheit.
var APIKey = "&units=imperial&appid=4abe6053f0c1aa8a76f221372c2666a2";

// This is the base URL for the API call for the weather application.
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=";

// This is the array of the cities that had been previously searched.
var citiesArray = JSON.parse(localStorage.getItem("cities")) || [];

// The variable for time through moment.js that shows the current day 
var m = moment();

// The fiveDayForecast function gives a forecast of the search city
// The citySearch function clears previously search cities
$(document).ready(function() {
	var city = citiesArray[citiesArray.length - 1];
	fiveDayForecast(city);
	citySearch(city);
});

// Started by clearing out previous searched cities 
function citySearch(city) {
	$(".city").empty();
	$(".temperature").empty();
	$(".humidity").empty();
	$(".wind").empty();
	$(".uvIndex").empty();

	// Created a variable with base URL ,searched city and Key for AJAX call.
	var citySearch = queryURL + city + APIKey;

	// The ajax call in the function to the Open Weather Map website via a GET method for the searched city's weather data.
	$.ajax({
		url: citySearch,
		method: "GET"
	// Data from the ajax call: city; the date (using moment.js); the icon image; temperature; humidity; wind speed; UV index.
	}).then(function(weatherData) {
		var cityInfo = weatherData.name;
		var dateInfo = weatherData.dt;
		var currentDate = moment.unix(dateInfo).format("L");
		// varible for icons pulled from the object array.
		var iconURL = "https://openweathermap.org/img/wn/";
		var iconString = "@2x.png";
		var iconWeather = weatherData.weather[0].icon;
		var iconUrl = iconURL + iconWeather + iconString;
		var iconImage = $("<img>");
		iconImage.attr("src", iconUrl);
		// Searched city, cuurent date and icon image appended to HTML.
		$(".city").append(cityInfo + " ");
		$(".city").append(currentDate + " ");
		$(".city").append(iconImage);

		// Temperature in fahrenheit appended to HTML.
		var temperature = weatherData.main.temp;
		var fahrenheitTemperature = temperature.toFixed(0)
		$(".temperature").append("Temperature: " + fahrenheitTemperature + " °F");

		// Humidity data being pulled from object array .
		var humidityInfo = weatherData.main.humidity;
		$(".humidity").append("Humidity: " + humidityInfo + "%");

		// Wind speed for searched city being pulled from the object array.
		var windSpeed = weatherData.wind.speed;
		$(".wind").append("Wind Speed: " + windSpeed + " MPH");

		// Longitude and latitude being pulled from the object array.
		var longitude = weatherData.coord.lon;
		var latitude = weatherData.coord.lat;

		// The longitude and latitude being passed through the uvIndex function.
		uvIndex(longitude, latitude);
	});
}

function uvIndex(longitude, latitude) {
	// Varibles making UV Index URL for ajax call
	var uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi?appid=4abe6053f0c1aa8a76f221372c2666a2&lat=";
	var uvIndexString = "&lon=";
	var indexSearch = uvIndexURL + latitude + uvIndexString + longitude;
	// A second ajax call pulls the data needed for the value of the UV index via GET method.
	$.ajax({
		url: indexSearch,
		method: "GET"
	}).then(function(weatherData) {
		var uvFinal = weatherData.value;

		// The UV index for searched city being appended.
		$(".uvIndex").append("UV Index: ");
		// JQuery button so uvIndex meter can change colors.
		var uvBtn = $("<button>").text(uvFinal);
		$(".uvIndex").append(uvBtn);

		// The UV index meter to indicate whether the conditions are favorable, moderate, or severe. 
		//A UV index of 0 to 2 indicates favorable conditions. 
		//A UV index of 3 to 5 indicates moderate conditions. 
		//A UV index that is 6 or higher is considered high risk.
		if (uvFinal < 3) {
			// The meter graphic color would be displayed as green.
			uvBtn.attr("style", "background-color:green");
		} else if (uvFinal < 6) {
			// The meter graphic color would be displayed as yellow.
			uvBtn.attr("style", "background-color:yellow");
		} else if (uvFinal < 16) {
			// The meter graphic color would be displayed as red.
			uvBtn.attr("style", "background-color:red");
		}
	})
};

function previouslySearchedCityButtons() {
	$(".list-group").empty();

	// loop to make previous searches an array and buttons to be selected again for later use.
	for (var i = 0; i < citiesArray.length; i++) {
		// Unordered list of previously search buttons appended to HTML.
		var cityButton = $("<li>");
		cityButton.addClass("cityName");
		cityButton.addClass("list-group-item");
		cityButton.attr("data-name", citiesArray[i]);
		cityButton.text(citiesArray[i]);
		$(".list-group").append(cityButton);
	}
	
	// Event listener for previous searched buttons 
	$(".cityName").on("click", function(event) {
		event.preventDefault();

		var city = $(this).data("name");

		fiveDayForecast(city);
		citySearch(city);
	});
}

// Function for the 5 days forecast cards to appear.
function fiveDayForecast(city) {
	var fiveFront = "https://api.openweathermap.org/data/2.5/forecast?q=";
	var fiveURL = fiveFront + city + APIKey;

	$(".card-text").empty();
	$(".card-title").empty();

	$.ajax({
		url: fiveURL,
		method: "GET"
	}).then(function(weatherData) {
		// Usign moment.js will help append the 5 days forecast.
		var dayOne = moment
			.unix(weatherData.list[1].dt)
			.utc()
			.format("L");
		$(".dayOne").append(dayOne);
		
		var dayTwo = moment
			.unix(weatherData.list[9].dt)
			.utc()
			.format("L");
		$(".dayTwo").append(dayTwo);
		
		var dayThree = moment
			.unix(weatherData.list[17].dt)
			.utc()
			.format("L");
		$(".dayThree").append(dayThree);
		
		var dayFour = moment
			.unix(weatherData.list[25].dt)
			.utc()
			.format("L");
		$(".dayFour").append(dayFour);
		
		var dayFive = moment
			.unix(weatherData.list[33].dt)
			.utc()
			.format("L");
		$(".dayFive").append(dayFive);

		// Weather icon for each day being pulled from the object array to then be appended to HTML.
		var dayOneIcon = $("<img>");
		var imageSourceOne = "https://openweathermap.org/img/wn/" + weatherData.list[4].weather[0].icon + "@2x.png";
		dayOneIcon.attr("src", imageSourceOne);
		$(".dayOneIcon").append(dayOneIcon);

		var dayTwoIcon = $("<img>");
		var imageSourceTwo = "https://openweathermap.org/img/wn/" + weatherData.list[12].weather[0].icon + "@2x.png";
		dayTwoIcon.attr("src", imageSourceTwo);
		$(".dayTwoIcon").append(dayTwoIcon);

		var dayThreeIcon = $("<img>");
		var imageSourceThree = "https://openweathermap.org/img/wn/" + weatherData.list[20].weather[0].icon + "@2x.png";
		dayThreeIcon.attr("src", imageSourceThree);
		$(".dayThreeIcon").append(dayThreeIcon);

		var dayFourIcon = $("<img>");
		var imageSourceFour = "https://openweathermap.org/img/wn/" + weatherData.list[28].weather[0].icon + "@2x.png";
		dayFourIcon.attr("src", imageSourceFour);
		$(".dayFourIcon").append(dayFourIcon);

		var dayFiveIcon = $("<img>");
		var imageSourceFive = "https://openweathermap.org/img/wn/" + weatherData.list[36].weather[0].icon + "@2x.png";
		dayFiveIcon.attr("src", imageSourceFive);
		$(".dayFiveIcon").append(dayFiveIcon);

		// Temperature for each day being pulled from the object array to then be appended to HTML.
		$(".dayOneTemperature").append("Temperature: ");
		$(".dayOneTemperature").append(
			tempAvg(
				weatherData.list[2].main.temp,
				weatherData.list[4].main.temp,
				weatherData.list[6].main.temp
			)
		);
		$(".dayOneTemperature").append(" °F");

		$(".dayTwoTemperature").append("Temperature: ");
		$(".dayTwoTemperature").append(
			tempAvg(
				weatherData.list[10].main.temp,
				weatherData.list[12].main.temp,
				weatherData.list[14].main.temp
			)
		);
		$(".dayTwoTemperature").append(" °F");

		$(".dayThreeTemperature").append("Temperature: ");
		$(".dayThreeTemperature").append(
			tempAvg(
				weatherData.list[18].main.temp,
				weatherData.list[20].main.temp,
				weatherData.list[22].main.temp
			)
		);
		$(".dayThreeTemperature").append(" °F");

		$(".dayFourTemperature").append("Temperature: ");
		$(".dayFourTemperature").append(
			tempAvg(
				weatherData.list[26].main.temp,
				weatherData.list[28].main.temp,
				weatherData.list[30].main.temp
			)
		);
		$(".dayFourTemperature").append(" °F");

		$(".dayFiveTemperature").append("Temperature: ");
		$(".dayFiveTemperature").append(
			tempAvg(
				weatherData.list[34].main.temp,
				weatherData.list[36].main.temp,
				weatherData.list[38].main.temp
			)
		);
		$(".dayFiveTemperature").append(" °F");

		// Humidity for each day being pulled from the object array to then be appended to HTML.
		$(".dayOneHumidity").append("Humidity: ");
		$(".dayOneHumidity").append(
			humidityAvg(
				weatherData.list[2].main.humidity,
				weatherData.list[4].main.humidity,
				weatherData.list[6].main.humidity
			)
		);
		$(".dayOneHumidity").append("%");

		$(".dayTwoHumidity").append("Humidity: ");
		$(".dayTwoHumidity").append(
			humidityAvg(
				weatherData.list[10].main.humidity,
				weatherData.list[12].main.humidity,
				weatherData.list[14].main.humidity
			)
		);
		$(".dayTwoHumidity").append("%");

		$(".dayThreeHumidity").append("Humidity: ");
		$(".dayThreeHumidity").append(
			humidityAvg(
				weatherData.list[18].main.humidity,
				weatherData.list[20].main.humidity,
				weatherData.list[22].main.humidity
			)
		);
		$(".dayThreeHumidity").append("%");

		$(".dayFourHumidity").append("Humidity: ");
		$(".dayFourHumidity").append(
			humidityAvg(
				weatherData.list[26].main.humidity,
				weatherData.list[28].main.humidity,
				weatherData.list[30].main.humidity
			)
		);
		$(".dayFourHumidity").append("%");

		$(".dayFiveHumidity").append("Humidity: ");
		$(".dayFiveHumidity").append(
			humidityAvg(
				weatherData.list[34].main.humidity,
				weatherData.list[36].main.humidity,
				weatherData.list[38].main.humidity
			)
		);
		$(".dayFiveHumidity").append("%");
	});
}

// The average temperature is calculated by taking temperatures from three instances of time and dividing it by three. 
function tempAvg(x, y, z) {
	var avgThree = (x + y + z) / 3.0;
	return avgThree.toFixed(0);;
}

function humidityAvg(x, y, z) {
	var avgHum = (x + y + z) / 3.0;
	return avgHum.toFixed(0);
}

// Event listener for search button the will call each funtion for weather data.
$("#add-city").on("click", function(event) {
	event.preventDefault();

	// The user inputs the city name that they are searching for into the input box with the #city-input ID.
	var city = $("#city-input").val().trim();

	var containsCity = false;

	if (citiesArray != null) {
		$(citiesArray).each(function(x) {
			if (citiesArray[x] === city) {
				containsCity = true;
			}
		});
	}

	if (containsCity === false) {
		citiesArray.push(city);
	}

	// Local storage is used to store data (previously searched cities) across browser sessions.
	localStorage.setItem("cities", JSON.stringify(citiesArray));

	// This called function displays the forecast for the upcoming five days.
	fiveDayForecast(city);

	// This called function places an ajax call to the Open Weather Map API to retrieve weather data for the city that the user searches.
	citySearch(city);

	// This called function renders the buttons (onto the page) of the previously searched cities.
	previouslySearchedCityButtons();
});


