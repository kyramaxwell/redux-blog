import axios from 'axios';
import { browserHistory } from 'react-router';

// const ROOT_URL = 'https://kmaxwell-blog-database.herokuapp.com/api';
const ROOT_URL = 'https://kmaxwell-backend-withauth.herokuapp.com/api';
// const ROOT_URL = 'http://localhost:9090/api';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  UPDATE_POST: 'UPDATE_POST',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};


export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts`).then(response => {
      dispatch({ type: 'FETCH_POSTS', payload: response.data });
    }).catch(error => {
      console.log(error);
    });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}`).then(response => {
      dispatch({ type: 'FETCH_POST', payload: response.data });
    }).catch(error => {
      console.log(error);
    });
  };
}

export function createPost(post) {
  return (dispatch) => {
    const fields = { title: post.title, tags: post.tags, content: post.content };
    axios.post(`${ROOT_URL}/posts`, fields, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
      browserHistory.push('/');
    }).catch(error => {
      console.log(error);
    });
  };
}

export function updatePost(post) {
  return (dispatch) => {
    const fields = { title: post.title, tags: post.tags, content: post.content };
    axios.put(`${ROOT_URL}/posts/${post.id}`, fields, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
      dispatch({ type: 'UPDATE_POST', payload: response.data });
      location.reload();
    }).catch(error => {
      console.log(error);
    });
  };
}

export function deletePost(id) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
      browserHistory.push('/');
    }).catch(error => {
      console.log(error);
    });
  };
}

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

// takes in an object with email and password (minimal user object)
export function signinUser({ email, password }) {
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  return (dispatch) => {
    // does an axios.post on the /signin endpoint
    axios.post(`${ROOT_URL}/signin`, { email, password }).then(response => {
      // on success does:
      //  dispatch({ type: ActionTypes.AUTH_USER });
      //  localStorage.setItem('token', response.data.token);
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/');
    // on error should dispatch(authError(`Sign In Failed: ${error.response.data}`));
    }).catch(error => {
      dispatch(authError(`Sign In Failed: ${error.response.data}`));
    });
  };
}

// takes in an object with email and password (minimal user object)
export function signupUser({ email, username, password }) {
  // returns a thunk method that takes dispatch as an argument (just like our create post method really)
  return (dispatch) => {
    // does an axios.post on the /signup endpoint (only difference from above)
    axios.post(`${ROOT_URL}/signup`, { email, username, password }).then(response => {
      // on success does:
      //  dispatch({ type: ActionTypes.AUTH_USER });
      //  localStorage.setItem('token', response.data.token);
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/');
    // on error should dispatch(authError(`Sign Up Failed: ${error.response.data}`));
    }).catch(error => {
      dispatch(authError(`Sign In Failed: ${error.response.data}`));
    });
  };
}


// deletes token from localstorage
// and deauths
export function signoutUser() {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    browserHistory.push('/');
  };
}
