var appDispatcher = require('../dispatchers/app-dispatcher');
var appConstants = require('../constants/app-constants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
  locations: [],
  defaultView: {lat: 37.775408, long: -122.413682, zoom: 13}
};

var addLocation = function(location){
  location.id = _store.locations.length;
  _store.locations.push(location);
};

var addComment = function(comment){
  var location = _store.locations[comment.location];
  if(!location.comments) location.comments = [];
  comment.id = location.comments.length;
  location.comments.push(comment);
};

var addWeatherToLocation = function(location, weather) {
  var index = _.findIndex(_store.locations, location);
  if(index < 0) return;
  _store.locations[index].weather = weather;
};

var locationStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  },
  getLocations: function(){
    return _store.locations;
  },
  getDefaultView: function() {
    return _store.defaultView;
  }
});

appDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.ADD_LOCATION:
      addLocation(action.data);
      locationStore.emit(CHANGE_EVENT);
      break;
    case appConstants.ADD_COMMENT:
      addComment(action.data);
      locationStore.emit(CHANGE_EVENT);
      break;
    case appConstants.GEOCODE_RESPONSE:
      addLocation(action.data);
      locationStore.emit(CHANGE_EVENT);
      break;
    case appConstants.WEATHER_RESPONSE:
      addWeatherToLocation(action.data.location, action.data.weather);
      locationStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = locationStore;
