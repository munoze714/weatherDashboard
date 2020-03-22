
$(document).ready(function () {

    function searchWeather(searchValue) {
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=b6c076c64edd480f39bbc31ea63b4a0f&units=imperial"
        $.ajax({
            url: url,
            type: "get",
        }).then(function (data) {
            $("#displayCity").text(data.name)
            var icon = data.weather[0].icon
            var DisplayIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png")
            // $("#displayCity").html("<img>")
            $("#displayTemp").text("Temperature: " + data.main.temp + "F")
            $("#displayWind").text("Wind Speed : " + data.wind.speed + "Mph")
            $("#displayHumidity").text("Humidity " + data.main.humidity + "%")
            $("#displayCity").append(DisplayIcon)
            weekDisplay(searchValue)
        })
    }

    function weekDisplay(weekValue) {
        var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + weekValue + "&appid=b6c076c64edd480f39bbc31ea63b4a0f&units=imperial"
        $.ajax({
            url: url,
            type: "get",
        }).then(function (data) {
            // console.log(data)
            var forecastArray = [];
            for (var i = 0; i < data.list.length; i++) {
                //console.log("each single thing", data.list[i].dt_txt.split(' ')[1])
                if (data.list[i].dt_txt.split(' ')[1] === '00:00:00') {
                    forecastArray.push(data.list[i])
                }
            }
            // console.log('its all said and done!!', forecastArray);
            for (var i = 0; i < forecastArray.length; i++) {
                var icon = forecastArray[i].weather[0].icon
                // console.log(icon)
                var weatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png")
                var cardCol = $("<div>").attr("class", "col-2")
                var cardDisplay = $("<div>").attr("class", "card")
                // "http://openweathermap.org/img/wn/10d@2x.png>" url for icon
                cardDisplay.text("Temp: " + forecastArray[i].main.temp +
                    " Humidity " + forecastArray[i].main.humidity)
                // console.log(weatherIcon)
                $("#forecastDays").append(cardCol)
                cardCol.append(cardDisplay)
                cardDisplay.prepend(weatherIcon)
            }
        })
    }

    $("#button").on("click", function () {
        // console.log("click");
        // console.log($("#inputSearch").val());
        searchWeather($("#inputSearch").val())
    })
});