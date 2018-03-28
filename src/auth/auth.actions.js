export const authActions = {
  login: {
    request: 'auth/LOGIN/REQUEST',
    success: 'auth/LOGIN/SUCCESS',
    fail: 'auth/LOGIN/FAIL',
  },
  authenticate: {
    request: 'auth/AUTHENTICATE/REQUEST',
    success: 'auth/AUTHENTICATE/SUCCESS',
    fail: 'auth/AUTHENTICATE/FAIL',
  },
  enter: {
    user: 'auth/ENTER_USER',
    guest: 'auth/ENTER_GUEST'
  },
  exit: {},
}
