import axios from 'axios';
import { browserHistory } from 'react-router';

const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
const API_KEY = '?key=k_maxwell';
// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  UPDATE_POST: 'UPDATE_POST',
};


export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`).then(response => {
      dispatch({ type: 'FETCH_POSTS', payload: response.data });
    }).catch(error => {
      console.log(error);
    });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`).then(response => {
      dispatch({ type: 'FETCH_POST', payload: response.data });
    }).catch(error => {
      console.log(error);
    });
  };
}

export function createPost(post) {
  return (dispatch) => {
    const fields = { title: post.title, tags: post.tags, content: post.content };
    axios.post(`${ROOT_URL}/posts/${API_KEY}`, fields).then(response => {
      browserHistory.push('/');
    }).catch(error => {
      console.log(error);
    });
  };
}

export function updatePost(post) {
  return (dispatch) => {
    const fields = { title: post.title, tags: post.tags, content: post.content };
    axios.put(`${ROOT_URL}/posts/${post.id}${API_KEY}`, fields).then(response => {
      dispatch({ type: 'UPDATE_POST', payload: response.data });
      browserHistory.push('/');
    }).catch(error => {
      console.log(error);
    });
  };
}

export function deletePost(id) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`).then(response => {
      browserHistory.push('/');
    }).catch(error => {
      console.log(error);
    });
  };
}
