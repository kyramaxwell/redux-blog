import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';
import Textarea from 'react-textarea-autosize';

class New extends Component {
  constructor(props) {
    super(props);
    // init component state here
    this.state = {
      title: '',
      tags: '',
      content: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const post = {
      title: this.state.title,
      tags: this.state.tags,
      content: this.state.content,
    };
    this.props.createPost(post);
  }
  render() {
    return (
      <div>
        <Link to="/" id="back"><i className="fa fa-arrow-left fa-lg"></i> Back to Home!</Link>
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
      </div>
    );
  }
}


const mapStateToProps = (state) => (
  {
    posts: state.posts.all,
    current: state.posts.current,
  }
);

export default connect(mapStateToProps, actions)(New);
