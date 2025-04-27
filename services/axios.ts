// services/axios.js
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const getPosts = () => {
  return axios.get(`${API_URL}/posts`);
};

export const updatePost = (id, data) => {
  return axios.put(`${API_URL}/posts/${id}`, data);
};

// import axios from "axios";

// const ENV = process.env.EXPO_PUBLIC_API_URL;

// export const getUsers = (data) => {
//     return axios.get(ENV + "posts", data);
// };