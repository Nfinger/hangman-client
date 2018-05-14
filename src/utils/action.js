import {
    LOG_IN,
    SIGN_UP,
    LOG_OUT
} from '../reducers/auth'

import { Api } from './Api';

export function createUser(user) {
    return (dispatch) => {
        Api.signup(user).then((res) => {
            const { user } = res.data
            dispatch(signUp(user))
            localStorage.setItem("userId", user.id)
        });
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
// export function confirmUserLogin(authCode) {
//     return (dispatch, getState) => {
//         // dispatch(confirmLogIn())
//         const {
//             auth: {
//                 user
//             }
//         } = getState()
//         console.log('state: ', getState())
//         Api.confirmSignIn(user, authCode)
//             .then(data => {
//                 console.log('data from confirmLogin: ', data)
//                 dispatch(confirmLoginSuccess(data))
//             })
//             .catch(err => {
//                 console.log('error signing in: ', err)
//                 dispatch(confirmSignUpFailure(err))
//             })
//     }
// }