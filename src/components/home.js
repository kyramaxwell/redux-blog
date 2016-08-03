import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';


class Home extends Component {
  constructor(props) {
    super(props);
    // init component state here
    this.state = {
    };
  }

  componentWillMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div>
        <h1> Posts </h1>
        <ul>
        {this.props.posts.map((post) => {
          return (<li key={post.id}><Link to={`/posts/${post.id}`} id="post"><i>{post.title}</i><i>{post.tags}</i></Link></li>);
        })}
        </ul>
      </div>
    );
  }

}

const mapStateToProps = (state) => (
  {
    posts: state.posts.all,
  }
);

export default connect(mapStateToProps, actions)(Home);
