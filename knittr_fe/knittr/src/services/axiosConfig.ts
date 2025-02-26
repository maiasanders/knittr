import axios from 'axios';
import { User } from '../helpers/apiResponseTypes';

const apiAccess = axios.create({
    baseURL: 'http://localhost:8080/api'
})

// get auth info info
let currentToken = localStorage.getItem('token');
let userData = localStorage.getItem('user');
let currentUser: User
if (typeof userData === 'string') currentUser = JSON.parse(userData);

// set up axios request headers
if (currentToken) axios.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;

apiAccess.defaults.headers.common["Authorization"] = currentToken;

export default apiAccess;
export { currentUser };
