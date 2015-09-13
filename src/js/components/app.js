var React = require('react');

var AddLocation = require('./add-location');
var MapboxContainer = require('./mapbox-container');
var AddComment = require('./add-comment');

var locationStore = require('../stores/location-store');
var locationActions = require('../actions/location-actions');
var OpenWeather = require('../services/open-weather');

var App = React.createClass({
  getInitialState: function(){
    return {
      locations: locationStore.getLocations(),
      view: locationStore.getDefaultView()
    };
  },
  componentDidMount: function() {
    locationStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    locationStore.removeChangeListener(this._onChange);
  },
  _onChange: function(){
    this.setState({
      locations: locationStore.getLocations()
    });
  },
  handleAddLocation: function(location) {
    locationActions.geocodeLocation(location);
  },
  handleAddComment: function(comment) {
    locationActions.addComment(comment);
  },
  render: function(){
    return (
        <div>
          <AddLocation add={this.handleAddLocation} />
          <MapboxContainer locations={this.state.locations} view={this.state.view} />
          <AddComment add={this.handleAddComment} locations={this.state.locations} />
        </div>
    );
  }
});

module.exports = App;
