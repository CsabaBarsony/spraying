import {authEvents, authStates} from 'auth/auth.statechart'
import {onEntry} from 'statechart'
import {dispatch} from 'store'

export const authApi = action => {
  switch (action.type) {
    case onEntry(authStates.STRANGER):
      const token = localStorage.getItem('token')

      if(token === 'valid token') {
        setTimeout(() => {
          dispatch({
            type: authEvents.AUTHENTICATION.SUCCESS,
            username: 'Test user',
          })
        }, 500)
      }
      else {
        setTimeout(() => {dispatch({type: authEvents.AUTHENTICATION.FAIL})}, 500)
      }
      break

    case onEntry(authStates.LOGGING_IN):
      setTimeout(() => {
        if(action.username === 'Test user' && action.password === 'pass') {
          localStorage.setItem('token', 'valid token')

          dispatch({
            type: authEvents.LOGIN.SUCCESS,
            username: 'Test user',
          })
        }
        else {
          dispatch({
            type: authEvents.LOGIN.FAIL,
            message: 'Wrong username or password',
          })
        }
      }, 500)
      break

    case onEntry(authStates.GUEST):
      localStorage.removeItem('token')
      break

    default:
      break
  }
}
