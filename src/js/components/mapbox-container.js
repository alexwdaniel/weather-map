var React = require('react');
var Mapbox = require('./mapbox');

var MapboxContainer = React.createClass({
  render: function() {
    return (
      <div id="map-container">
        <Mapbox
          accessToken="pk.eyJ1IjoiYWRhbmllbCIsImEiOiJiMTU3ZTVmNWM4MDEyYzI4NDg5ODNkMGY1Y2ZiZTQ2NyJ9.io4DkPTEsfQE0iUI3tw2WA"
          mapId="adaniel.n642mh1k"
          locations={this.props.locations}
          view={this.props.view} />
      </div>
    );
  }
});

module.exports = MapboxContainer;
