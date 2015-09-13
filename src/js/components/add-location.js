var React = require('react');

var AddLocation = React.createClass({
  handleSubmit: function(e){
    if(e.keyCode === 13){
      var newLocation = this.refs.newLocation.getDOMNode().value;
      this.refs.newLocation.getDOMNode().value = '';
      this.props.add(newLocation);
    }
  },
  render: function(){
    return (
      <div className="add-location">
        <input type="text" ref="newLocation" className="form-control" placeholder="Enter Location" onKeyDown={this.handleSubmit}  />
      </div>
    );
  }
});

module.exports = AddLocation;
