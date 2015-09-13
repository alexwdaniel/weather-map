var React = require('react');

var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var comment = {
      text: React.findDOMNode(this.refs.commentText).value.trim(),
      location: React.findDOMNode(this.refs.commentLocation).value.trim()
    };
    this.props.add(comment);
    this.props.cancel();
  },
  render: function() {
    var selectOptions = this.props.locations.map(function(o){
      return <option key={o.id} value={o.id}>{o.placeName}</option>;
    });

    return (
      <div className="comment-form">
        <form onSubmit={this.handleSubmit}>
          <textarea ref="commentText" className="form-control" rows="3" placeholder="Add Comment"></textarea>

          <select ref="commentLocation" className="form-control">
            {selectOptions}
          </select>

          <div className="text-right">
            <button className="btn btn-default" type="button" onClick={this.props.cancel}>cancel</button>
            <button className="btn btn-primary" type="submit">Post</button>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = CommentForm;
