var React = require('react');
var MapboxMarker = require('./mapbox-marker');

var Mapbox = React.createClass({
  propTypes: {
    accessToken: React.PropTypes.string.isRequired,
    mapId: React.PropTypes.string.isRequired
  },
  componentDidMount: function() {
    this._initMap();
  },
  componentDidUpdate: function(prevProps, prevState) {
    this._renderMarkers(prevProps.locations);
  },
  _initMap: function() {
    L.mapbox.accessToken = this.props.accessToken;
    var map = this.map = L.mapbox.map('map', this.props.mapId);
    map.setView([this.props.view.lat, this.props.view.long], this.props.view.zoom);
  },
  _renderMarkers: function(markers) {
    this._clearMarkers();
    this._addMarkers(markers);
  },
  _clearMarkers: function() {
    if(this.markers) {
      this.markers.forEach(function(marker){ this.map.removeLayer(marker); }.bind(this));
      this.markers = [];
      // console.log('cleared markers');
    }
  },
  _addMarkers: function(markers) {
    if(markers.length < 1) return;
    this.markers = markers.map(function(elem){
      var markerHTML = this._getMarkerElement(elem);
      return L.marker([elem.lat,elem.long]).bindPopup(markerHTML).addTo(this.map);
    }.bind(this));
    // console.log('added markers', this.markers);
  },
  _getMarkerElement: function(elem) {
    return React.render(<MapboxMarker marker={elem} />, document.createElement('div')).getDOMNode();
  },
  render: function() {
    // console.log("Mapbox render called");
    return (
      <div id="map"></div>
    );
  }
});

module.exports = Mapbox;
