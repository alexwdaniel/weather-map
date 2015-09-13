var React = require('react');
var MarkerComments = require('./marker-comments');

var MapboxMarker = React.createClass({
  _getWeatherContent: function() {
    return (
      <div>
        <p>{(this.props.marker.weather.main.temp - 273).toFixed(2)} <i className="wi wi-celsius"></i></p>
        <p>{this.props.marker.weather.main.humidity} <i className="wi wi-humidity"></i></p>
      </div>
    );
  },
  render: function() {
    var weatherContent, commentsContent;
    if(this.props.marker.weather) {
      weatherContent = this._getWeatherContent();
    }

    if(this.props.marker.comments) {
      commentsContent = <MarkerComments comments={this.props.marker.comments} />;
    }

    return (
      <div className="text-center mapbox-marker">
        <h4>{this.props.marker.placeName}</h4>
        <p className="text-center">{this.props.marker.lat} x {this.props.marker.long}</p>
        {weatherContent}
        {commentsContent}
      </div>
    );
  }
});

module.exports = MapboxMarker;
