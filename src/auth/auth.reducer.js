import update from 'immutability-helper'
import {authActions} from 'auth/auth.actions'

const initialState = {
  isAuthenticated: false,
  isUser: false,
  username: '',
}

export const authReducer = (state = initialState, action) => {
  console.log(action)
  switch(action.type) {
    case authActions.authenticate.success:
      return update(state, {
        username: {
          $set: action.username,
        },
      })

    case authActions.enter.user:
      return update(state, {
        isAuthenticated: {
          $set: true,
        },
        isUser: {
          $set: true,
        },
      })

    case authActions.enter.guest:
      return update(state, {
        isAuthenticated: {
          $set: true,
        },
        isUser: {
          $set: false,
        },
      })

    default:
      return state
  }
}
