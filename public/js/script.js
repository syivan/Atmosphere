class Quotes {
    constructor() {
        this.api_key = "kb0CDz6LPT/X+fmTl2HYjQ==7p2zsZxFeHquTmY1";
        this.url = "https://api.api-ninjas.com/v1/quotes?category=happiness";
    }

    async setQuote() {
        var category = 'happiness'
        $.ajax({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
            headers: { 'X-Api-Key': this.api_key },
            contentType: 'application/json',
            success: function (result) {
                console.log(result);
            },
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
            }
        }).then(data => {
            $(".card-subtitle").html(data[0].author);
            $(".card-text").html(data[0].quote);
        });
    }
}

class Activity {
    constructor() {
        this.url = "https://www.boredapi.com/api/activity/"
    }

    async getActivity(weather) {
        if (weather == "light snow" || weather == "light rain" || weather == "heavy intensity rain" || weather == "mist") {
            this.url = "http://www.boredapi.com/api/activity?accessibility=1"
        }
        const activityResponse = await fetch(this.url, {
            method: "GET",
        });
        const activityData = await activityResponse.json();
        console.log(activityData);
        $("#activity-type").html(`Based on the ${weather}, we recommend ${activityData.type}...`);
        $("#activity").html(`${activityData.activity}`);
    }
}

class Weather {
    constructor() {
        this.api_key = "6b8a18e5d8b44dfa8d65a91235fc4727";
    }

    async setWeatherData(location) {
        const areaResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${this.api_key}`, {
            method: "GET",
        });

        if (areaResponse.status != 200) {
            alert("Value entered is not a valid location");
            return;
        }
        const areaData = await areaResponse.json();

        let currentTemp = this.convertKToF(areaData.main.temp)
        let feelsLikeTemp = this.convertKToF(areaData.main.feels_like);
        let highTemp = this.convertKToF(areaData.main.temp_max);
        $("#locationInfo").html(`Location:\t${areaData.name}`);
        $("#tempInfo").html(`Temp:\t${currentTemp}°F`);
        $("#descriptionInfo").html(`Description:\t${areaData.weather[0].description}`);
        $("#feelsLikeInfo").html(`Feels Like:\t${feelsLikeTemp}°F`);
        $("#highInfo").html(`Today's High:\t${highTemp}°F`);
        $("#humidityInfo").html(`Humidity:\t${areaData.main.humidity}%`);

        let weatherDesc = areaData.weather[0].description;
        console.log(weatherDesc);
        if (weatherDesc === "overcast clouds" || weatherDesc === 'broken clouds' || weatherDesc === 'scattered clouds') {
            $("#icon").prop("src", "images/clouds.png");
        }
        if (weatherDesc === "mist") {
            $("#icon").prop("src", "images/mist.png");
        }
        if (weatherDesc === "clear sky" || weatherDesc === 'few clouds') {
            $("#icon").prop("src", "images/clear.png");
        }
        if (weatherDesc === 'heavy intensity rain') {
            $("#icon").prop("src", "images/rain.png");
        }
        if (weatherDesc === "light rain") {
            $("#icon").prop("src", "images/drizzle.png");
        }
        if (weatherDesc === "light snow") {
            $("#icon").prop("src", "images/snow.png");
        }
        activity = new Activity;
        activity.getActivity();
    }

    convertKToF(temp) {
        temp = parseFloat(temp);
        let result = ((temp - 273.15) * 1.8) + 32;
        return result.toFixed(2);
    }
}

quote = new Quotes;
weather = new Weather;
quote.setQuote();

$("#home-tab").click(function () {
    quote.setQuote();
});


$(document).ready(async function getWeatherData() {
    $("#searchWeather").click(function () {
        var location = $("#location").val().trim();
        if (location === "" || location === undefined) {
            alert("Enter a valid input");
            return;
        }
        weather.setWeatherData(location);
    });
});
