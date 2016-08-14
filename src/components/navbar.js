import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';


class Navbar extends Component {
  constructor(props) {
    super(props);
    // init component state here
    this.state = {
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();
    this.props.signoutUser();
  }

  rendersignin() {
    if (this.props.auth) {
      return (
        <button id="signout" onClick={this.onClick}>Sign Out</button>
      );
    } else {
      return (
        <div id="logins">
          <Link to="signin" id="signin">Sign In</Link>
          <Link to="signup" id="signup">Sign Up</Link>
        </div>
      );
    }
  }
  render() {
    return (
      <div id="navbar">
        <Link to="/" id="home"><i className="fa fa-bullseye fa-2x"></i></Link>
        {this.rendersignin()}
        <Link to="posts/new" id="newpost">New Post</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    auth: state.auth.authenticated,
  }
);

export default connect(mapStateToProps, actions)(Navbar);
