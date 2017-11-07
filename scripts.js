function setTime() {
  var colon = ":";
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  //Display seconds & minutes with two digits if < 10
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  // display current time in innerHTML of #time
  var timeNow = `${hours}${colon}${minutes}${colon}${seconds}`;
  document.getElementById("time").innerHTML = timeNow;
}
//update setTime every 1000ms
setInterval(setTime, 1000), setTime();

// diplay .title and .sub at the top of the page
document.getElementById("title").innerHTML = "FCC";
document.getElementById("sub").innerHTML = "Weather App";

$(document).ready(function() {
  //Get Locatiion and declare in var lat and long
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    //add lat and long to URL with template literals
    var weatherApiURL = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`;
    console.log(weatherApiURL);
    // Get wheather object
    $.getJSON(weatherApiURL, function(json) {
      // console.log(json);
      //disolay location on page
      document.getElementById("location").innerHTML = json.name;
      //display weather icon
      var iconURL = json.weather[0].icon;
      document.getElementById("icon").src = iconURL;
      // display weather condition description (i.e. cloudy, sunny etc.)
      document.getElementById("condition").innerHTML =
        json.weather[0].description;
      // display curent temp, day high and day low
      var temp = json.main.temp.toFixed(1);
      var tempLo = json.main.temp_min.toFixed(1);
      var tempHi = json.main.temp_max.toFixed(1);
      //temperatures converted to farenheit
      var tempF = (temp * (9 / 5) + 32).toFixed(1);
      var tempLoF = (tempLo * (9 / 5) + 32).toFixed(1);
      var tempHiF = (tempHi * (9 / 5) + 32).toFixed(1);
      //default temperature display in celcius on document ready
      $(".temp").html(temp + "&deg;C");
      $(".temp-low").html(tempLo + "&deg;C");
      $(".temp-high").html(tempHi + "&deg;C");
      //toggel between celcius and farenheit on click
      var celsius = false;
      $(".button").click(function() {
        if (celsius) {
          $(".temp").html(tempF + "&deg;F");
          $(".temp-low").html(tempLoF + "&deg;F");
          $(".temp-high").html(tempHiF + "&deg;F");
        } else {
          $(".temp").html(temp + "&deg;C");
          $(".temp-low").html(tempLo + "&deg;C");
          $(".temp-high").html(tempHi + "&deg;C");
        }
        celsius = !celsius;
      });
    });
  });
});
