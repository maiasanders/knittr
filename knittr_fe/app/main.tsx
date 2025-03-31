import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './root.tsx'
import axios from 'axios'

// Set base URL for axios
axios.defaults.baseURL = import.meta.env.KNITTR_REMOTE_API;

// set up token, etc if logged in
let currentToken = localStorage.getItem('token');
// let userData = localStorage.getItem('user');
// let currentUser: User
// if (typeof userData === 'string') currentUser = JSON.parse(userData);

// set up axios request headers
if (currentToken) axios.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
