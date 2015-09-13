var React = require('react');
var CommentForm = require('./comment-form');

var AddComment = React.createClass({
  getInitialState: function() {
    return {showInput: false};
  },
  handleClick: function() {
    this.setState({showInput: true});
  },
  handleCancel: function() {
    this.setState({showInput: false});
  },
  render: function() {
    if(this.props.locations.length < 1) return null;

    var content;
    if(this.state.showInput) {
      content = <CommentForm add={this.props.add} cancel={this.handleCancel} locations={this.props.locations} />;
    } else {
      content = <i className="glyphicon glyphicon-plus" onClick={this.handleClick}></i>;
    }

    return (
      <div className="add-comment">
        {content}
      </div>
    );
  }
});

module.exports = AddComment;
