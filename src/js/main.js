global.jQuery = global.$ = require('jquery');
global._ = require('lodash');

var React = require('react');
var App = require('./components/app');

React.render(
  <App />,
  document.getElementById('main')
);
