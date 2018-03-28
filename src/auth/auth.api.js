import {store} from 'store'
import {authActions} from 'auth/auth.actions'

export const authApi = {
  authenticate: () => {
    setTimeout(() => {
      store.dispatch({
        type: authActions.authenticate.success,
        username: 'Test user',
      })
    }, 300)
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
