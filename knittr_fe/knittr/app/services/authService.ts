import apiAccess from "./axiosConfig"
// import axios from "axios";
import { Auth, LoginDto } from "../helpers/apiResponseTypes";
import { AxiosResponse } from "axios";


export default {
    login(user: LoginDto) {
        return apiAccess.post('/login', user);
    },
    register(user: LoginDto) {
        return apiAccess.post('/register', { user })
    }
}
