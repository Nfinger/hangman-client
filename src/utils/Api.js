import axios from 'axios'
import { config } from '../config';

export class Api {
    static getUserById = (userId) => {
        return axios.get(`${config.baseAPI}/user/${userId}`)
    }

    static signup = (user) => {
        return axios.post(`${config.baseAPI}/signup`, {email: user.email, username: user.username, password: user.password})
    }

    static login = (user) => {
        return axios.post(`${config.baseAPI}/login`, {email: user.email, password: user.password})
    }

    static newGame = (userId, difficulty) => {
        return axios.get(`${config.baseAPI}/game/${userId}/${difficulty}`)
    }

    static finishGame = (gameId, outcome, correct, incorrect) => {
        return axios.post(`${config.baseAPI}/game/${gameId}`, {outcome, correct, incorrect})
    }
}