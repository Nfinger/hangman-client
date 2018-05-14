export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'

export const SIGN_UP = 'SIGN_UP'

const initialState = {
  user: null,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SIGN_UP:
      return {
        ...state,
        user: action.user,
      }
    case LOG_IN:
      return {
        ...state,
        user: action.user,
      }
    case LOG_OUT:
      return {
        ...initialState,
      }
    default:
      return state
  }
}