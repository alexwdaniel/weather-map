var BASE_API_URL = "http://api.openweathermap.org/data/2.5/weather";

function buildURL(lat, long) {
  return BASE_API_URL + "?lat=" + lat + "&lon=" + long;
}

var OpenWeather = {
  get: function(lat, long) {
    var url = buildURL(lat, long);
    return $.ajax(url);
  }
};

module.exports = OpenWeather;
