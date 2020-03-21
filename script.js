$(document).ready(function () {

    function searchWeather(searchValue) {
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=b6c076c64edd480f39bbc31ea63b4a0f&units=imperial"
        $.ajax({
            url: url,
            type: "get",
        }).then(function (data) {
            $("#displayCity").text(data.name).append("<i>").attr("fa fa-cloud")
            $("#displayTemp").text("Temperature: " + data.main.temp + "F")
            $("#displayWind").text("Wind Speed : " + data.wind.speed + "Mph")
            $("#displayHumidity").text("Humidity: " + data.main.humidity + "%")
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
            console.log('its all said and done!!', forecastArray);

            for (var i = 0; i < forecastArray.length; i++) {
                var cardCol = $("<div>").attr(".col-2")
                var cardDisplay = $("<div>").attr(".card")
                cardDisplay.text("hi")

                $("#forecastDays").append(cardCol)
                cardCol.append(cardDisplay)
                // if ()

            }





        })







    }




    $("#button").on("click", function () {

        // console.log("click");
        // console.log($("#inputSearch").val());
        searchWeather($("#inputSearch").val())
    })

});