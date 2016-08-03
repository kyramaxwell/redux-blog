import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';
import Textarea from 'react-textarea-autosize';
import marked from 'marked';


class Show extends Component {
  constructor(props) {
    super(props);
    // init component state here
    this.state = {
      editing: false,
      title: '',
      tags: '',
      content: '',
    };
    this.onDelete = this.onDelete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  onDelete() {
    this.props.deletePost(this.props.params.id);
  }

  onSubmit(event) {
    event.preventDefault();
    const post = {
      id: this.props.current._id,
      title: this.state.title,
      tags: this.state.tags,
      content: this.state.content,
    };
    this.props.updatePost(post);
  }


  renderEditable() {
    if (this.state.editing) {
      return (
        <form className="content-form">
          <input type="text" name="title" value={this.state.title} onChange={(event) => {
            this.setState({ title: event.target.value });
          }} />
          <input type="text" name="tags" value={this.state.tags} onChange={(event) => {
            this.setState({ tags: event.target.value });
          }} />
          <Textarea type="textarea" name="content" value={this.state.content} onChange={(event) => {
            this.setState({ content: event.target.value });
          }} />
          <input type="submit" onClick={this.onSubmit} />
        </form>
      );
    } else {
      return (
        <div id="note-display">
          <h1>{this.props.current.title}</h1>
          <h2>{this.props.current.tags}</h2>
          <div dangerouslySetInnerHTML={{ __html: marked(this.props.current.content || '') }} />
          <div id="icons">
            <i className="fa fa-pencil fa-2x" onClick={() => {
              this.setState({
                editing: true,
                title: this.props.current.title,
                tags: this.props.current.tags,
                content: this.props.current.content,
              }); }}></i>
            <i className="fa fa-trash-o fa-2x" onClick={this.onDelete}></i>
          </div>
        </div>
    );
    }
  }

  render() {
    return (
      <div>
        <Link to="/" id="back"><i className="fa fa-arrow-left fa-lg"></i> Back to Home!</Link>
        {this.renderEditable()}
      </div>
    );
  }

}

const mapStateToProps = (state) => (
  {
    current: state.posts.current,
  }
);

export default connect(mapStateToProps, actions)(Show);
