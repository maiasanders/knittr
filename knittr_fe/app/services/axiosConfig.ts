import axios from 'axios';
// import { User } from '../helpers/apiResponseTypes';


const apiAccess = axios.create({
    baseURL: 'http://localhost:8080/api'
})

// get auth info info
let currentToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null

// set up axios request headers
// if (currentToken) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
// axios.interceptors
// }

apiAccess.interceptors.request.use(
    (config) => {
        if (!config.headers.Authorization && typeof window !== 'undefined' && localStorage.getItem('token')) {
            config.headers.Authorization = `Bearer ${currentToken}`
        }
        config.baseURL = 'http://localhost:8080/api'
        return config
    }, null, { synchronous: true }
)

// apiAccess.defaults.headers.common["Authorization"] = currentToken;




export default apiAccess;
// export { currentUser };
