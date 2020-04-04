var date = moment().format("MM/DD/YYYY");

$(document).ready(function () {

    function searchWeather(searchValue) {
        $("#forecastDays").empty(searchValue)
        var apiUrl = "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=b6c076c64edd480f39bbc31ea63b4a0f&units=imperial"
        $.ajax({
            url: apiUrl,
            type: "get",

        }).then(function (data) {
            console.log(data)
            $("#displayCity").text(data.name + "(" + date + ")")
            var icon = data.weather[0].icon
            var DisplayIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png")
            $("#displayTemp").text("Temperature: " + data.main.temp + "F")
            $("#displayWind").text("Wind Speed : " + data.wind.speed + "Mph")
            $("#displayHumidity").text("Humidity " + data.main.humidity + "%")
            $("#displayCity").append(DisplayIcon)
            weekDisplay(searchValue)

            var lat = data.coord.lat
            var lon = data.coord.lon
            uvDisplay(lat, lon)
        })
    }

    function uvDisplay(lat, lon) {
        var apiUrl = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/uvi?appid=b6c076c64edd480f39bbc31ea63b4a0f&lat=" + lat + "&lon=" + lon

        $.ajax({
            url: apiUrl,
            method: "get",

        }).then(function (data) {
            // console.log(data)
            // console.log(data.value)
            var uvIndex = $("<div>").attr("id", "uvDisplay")
            $(".col2").append(uvIndex)
            $("#uvDisplay").text("UV Index: ")
            uvIndex.append($("#uvDisplay"))

            var favorable = $("<button>").text(data.value).attr("style", "background-color: green")
            var moderate = $("<button>").text(data.value).attr("style", "background-color: orange")
            var severe = $("<button>").text(data.value).attr("style", "background-color: red")

            if (data.value <= 2) {
                $("#uvDisplay").append(favorable)
            } else if (data.value <= 5) {
                $("#uvDisplay").append(moderate)
            } else {
                $("#uvDisplay").append(severe)
            }
        })
    }

    function weekDisplay(weekValue) {
        var apiUrl = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=" + weekValue + "&appid=b6c076c64edd480f39bbc31ea63b4a0f&units=imperial"
        $.ajax({
            url: apiUrl,
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
            // console.log(forecastArray);
            for (var i = 0; i < forecastArray.length; i++) {
                var icon = forecastArray[i].weather[0].icon
                // console.log(icon)
                // "http://openweathermap.org/img/wn/10d@2x.png>" url for icon

                var weatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png")
                var cardCol = $("<div>").attr("class", "col-2")
                var cardDisplay = $("<div>").attr("class", "card")
                var text = $('<p>')
                text.text(forecastArray[i].dt_txt.split(" ")[0] + " Temp: " + forecastArray[i].main.temp +
                    " Humidity: " + forecastArray[i].main.humidity)
                // console.log(weatherIcon)
                cardDisplay.prepend(weatherIcon, text)
                cardCol.append(cardDisplay)
                $("#forecastDays").append(cardCol)
            }
        })
    }

    function saveSearch(newSearch) {
        if (localStorage.getItem("history")) {
            var newHistory = JSON.parse(localStorage.getItem("history"))
            newHistory.push(newSearch)
            var strHistory = JSON.stringify(newHistory)
            localStorage.setItem("history", strHistory)

        } else {
            var newHistory = []
            newHistory.push(newSearch)
            var strHistory = JSON.stringify(newHistory)
            localStorage.setItem("history", strHistory)
        }
    }

    function displaySearch() {
        var displayLocal = JSON.parse(localStorage.getItem("history"))

        if (displayLocal) {
            for (var i = 0; i < displayLocal.length; i++) {
                var searchTerm = $("<p>").text(displayLocal[i])
                $("#searchStorage").append(searchTerm)
            }
            $("p").on("click", function () {
                var htmlString = $(this).html();
                searchWeather(htmlString)
            })
        }
    }
    displaySearch()

    $("#button").on("click", function () {
        // console.log("click");
        // console.log($("#inputSearch").val());
        searchWeather($("#inputSearch").val())
        // empty($("#inputSearch"))
        saveSearch($("#inputSearch").val())
    })

    $("#clearLocal").on("click", function () {
        localStorage.clear();
    })
});