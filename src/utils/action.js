import {
    LOG_IN,
    SIGN_UP,
    LOG_IN_ERROR,
    SIGN_UP_ERROR,
    LOG_OUT,
    UPDATE_USER
} from '../reducers/auth'

import { Api } from './Api';

export function createUser(user) {
    return (dispatch) => {
        Api.signup(user).then((res) => {
            const { user, error } = res.data
            if (error) {
                dispatch(signupError(error))
                return;
            }
            dispatch(signUp(user))
            localStorage.setItem("userId", user.id)
        });
    }
}

export const loginUser = (user) => {
    return (dispatch) => {
        Api.login(user).then((res) => {
            const { user, error } = res.data
            if (error) {
                dispatch(loginError(error))
                return;
            }
            dispatch(logIn(user))
            localStorage.setItem("userId", user.id)
        })
    }
}

export const gameOver = (gameId, outcome, correct, incorrect) => {
    return (dispatch) => {
        Api.finishGame(gameId, outcome, correct, incorrect).then(res => {
            const { user } = res.data
            dispatch(updateUser(user))
        })
    }
}

function signupError(err) {
    return {
        err,
        type: SIGN_UP_ERROR
    }
}

function loginError(err) {
    return {
        err,
        type: LOG_IN_ERROR
    }
}

function signUp(user) {
    return {
        user,
        type: SIGN_UP
    }
}

function logIn(user) {
    return {
        user,
        type: LOG_IN
    }
}

function updateUser(user) {
    return {
        user,
        type: UPDATE_USER
    }
}

export function logOut() {
    return {
        type: LOG_OUT
    }
}

export const logoutUser = () => {
    return (dispatch) => {
        localStorage.removeItem("userId")
        dispatch(logOut())
    }
}

export const authenticate =  (userId) => {
    return async (dispatch) => {
        const res = await Api.getUserById(userId)
        const { user } = res.data
        dispatch(logIn(user))
    }
}