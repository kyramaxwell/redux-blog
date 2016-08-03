import React from 'react';
import { Link } from 'react-router';

const Navbar = () => {
  return (
    <div id="navbar">
      <Link to="/" id="home"><i className="fa fa-bullseye fa-2x"></i></Link>
      <Link to="posts/new" id="newpost">New Post</Link>
    </div>
  );
};

export default Navbar;
