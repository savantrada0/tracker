import axios from 'axios';

const token = localStorage.getItem("token");

if (token) {
	axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(token)}`;
}

const API = axios.create({
	baseURL: process.env.REACT_APP_API_ENDPOINT
});

export default API;