var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var MapboxAPI = require('../services/mapbox-api');
var OpenWeather = require('../services/open-weather');

var locationActions = {
  addLocation: function(location) {
    AppDispatcher.handleAction({
      actionType: AppConstants.ADD_LOCATION,
      data:location
    });
  },
  addComment: function(comment) {
    AppDispatcher.handleAction({
      actionType: AppConstants.ADD_COMMENT,
      data: comment
    });
  },
  geocodeLocation: function(location) {
    MapboxAPI.geocode(location).then(function(data){
      AppDispatcher.handleAction({
        actionType: AppConstants.GEOCODE_RESPONSE,
        data: data
      });
      this.getLocationWeather(data);
    }.bind(this));
  },
  getLocationWeather: function(location) {
    OpenWeather.get(location.lat, location.long).then(function(data){
      // console.log("Weather data: ", data);
      var actionData = {
        location: location,
        weather: data
      };

      AppDispatcher.handleAction({
        actionType: AppConstants.WEATHER_RESPONSE,
        data: actionData
      });
    });
  }
};

module.exports = locationActions;
