import axios from 'axios';

const api = axios.create({
  baseURL: "https://the-trivia-api.com/v2/questions",
});

export default api;
