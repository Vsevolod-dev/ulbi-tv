import axios from "axios";

export default class AuthService {
    static async login({login, password}) {
        const response = await axios.post('/api/auth/login', {
            login,
            password
        })
        return response.data
    }

    static async register({login, password, passwordConfirm}) {
        const response = await axios.post('/api/auth/register', {
            login,
            password,
            passwordConfirm
        })
        return response.data
    }
}