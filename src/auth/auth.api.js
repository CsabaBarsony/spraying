import {store} from 'store'
import {authActions} from 'auth/auth.actions'
import {events} from 'statechart'

export const authApi = {
  authenticate: () => {
    const token = localStorage.getItem('token')

    if(token) {
      setTimeout(() => {
        store.dispatch({
          type: events.AUTHENTICATION_SUCCESS,
          username: 'Test user',
          token: 'sample_token',
        })
      }, 500)
    }
    else {
      setTimeout(() => {
        store.dispatch({
          type: events.AUTHENTICATION_FAIL,
        })
      }, 500)
    }
  },
  login: (username, password) => {
    setTimeout(() => {
      if(username === 'abc' && password === 'asdf') {
        store.dispatch({
          type: authActions.login.success,
          data: {
            username: 'abc',
            token: 'asdfasdf',
          },
        })
      }
      else {
        store.dispatch({
          type: authActions.login.fail,
          data: {
            message: 'wrong username or password',
          },
        })
      }
    }, 300)
  },
}
