export const LOG_IN = 'LOG_IN'
export const LOG_IN_ERROR = 'LOG_IN_ERROR'
export const LOG_OUT = 'LOG_OUT'

export const SIGN_UP = 'SIGN_UP'
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR'

export const UPDATE_USER = 'UPDATE_USER'

const initialState = {
  user: null,
  err: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SIGN_UP:
      return {
        ...state,
        user: action.user,
      }
    case SIGN_UP_ERROR:
      return {
        ...state,
        err: action.err,
      }
    case LOG_IN:
      return {
        ...state,
        user: action.user,
      }
    case LOG_IN_ERROR:
      return {
        ...state,
        err: action.err,
      }
    case LOG_OUT:
      return {
        ...initialState,
      }
    case UPDATE_USER:
      return {
        ...state,
        user: action.user
      }
    default:
      return state
  }
}