import {onEntry, states} from 'statechart'

const initialState = {
  isAuthenticated: false,
  isUser: false,
  username: '',
  message: '',
}

export const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case onEntry(states.MEMBER):
      return {
        isAuthenticated: true,
        isUser: true,
        username: action.username,
      }

    case onEntry(states.GUEST):
      return {
        isAuthenticated: true,
        isUser: false,
        username: '',
        message: action.message,
      }

    default:
      return state
  }
}
