import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);
    // init component state here
    this.state = {
      email: '',
      password: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.signinUser(user);
  }
  render() {
    return (
      <div>
        <Link to="/" id="back"><i className="fa fa-arrow-left fa-lg"></i> Back to Home!</Link>
        <h1> Sign In </h1>
        <form className="content-form">
          <input placeholder="email" type="text" name="email" value={this.state.email} onChange={(event) => {
            this.setState({ email: event.target.value });
          }} />
          <input placeholder="password" type="text" name="password" value={this.state.password} onChange={(event) => {
            this.setState({ password: event.target.value });
          }} />
          <input type="submit" onClick={this.onSubmit} />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
  }
);

export default connect(mapStateToProps, actions)(SignIn);
