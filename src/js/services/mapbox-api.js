var BASE_API_URL = 'https://api.mapbox.com/v4/geocode/';
var ACCESS_TOKEN = "pk.eyJ1IjoiYWRhbmllbCIsImEiOiJiMTU3ZTVmNWM4MDEyYzI4NDg5ODNkMGY1Y2ZiZTQ2NyJ9.io4DkPTEsfQE0iUI3tw2WA";

function buildURL(_query_, _dataset_) {
  var dataset = _dataset_ || 'mapbox.places';
  var query = encodeURI(_query_);

  return BASE_API_URL + dataset + "/" + query + ".json?access_token=" + ACCESS_TOKEN;
}

function parseResponse(response, query) {
  var feature = response.features.shift();
  if(!feature) return;

  var lat  = feature.center[1],
      long = feature.center[0];

  return {
    lat: lat,
    long: long,
    userLocation: query,
    placeName: feature.place_name,
    relevance: feature.relevance
  };
}

var MapboxAPI = {
  geocode: function(query) {
    var url = buildURL(query);
    var promise = new Promise(function(resolve, reject){
      $.ajax(url).then(function(data){
        var parsedData = parseResponse(data, query);
        resolve(parsedData);
      });
    });
    return promise;
  }
};

module.exports = MapboxAPI;
