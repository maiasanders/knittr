import apiAccess from "./axiosConfig"
import { LoginDto } from "../helpers/apiResponseTypes";

export default {
    login(user: LoginDto) {
        return apiAccess.post('/login', user);
    },
    register(user: LoginDto) {
        return apiAccess.post('/register', { user })
    }
}
