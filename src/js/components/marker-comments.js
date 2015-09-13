var React = require('react');

var MarkerComments = React.createClass({
  _getCommentsContent: function() {
    return this.props.comments.map(function(comment){
      return <div key={comment.id} className="comment">{comment.text}</div>;
    });
  },
  render: function() {
    var commentsContent = this._getCommentsContent();
    return (
      <div className="marker-comments">
        {commentsContent}
      </div>
    );
  }
});

module.exports = MarkerComments;
