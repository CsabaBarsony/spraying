export const states = {
  STRANGER: 'STRANGER',
  LOGGING_IN: 'LOGGING_IN',
  GUEST: 'GUEST',
  MEMBER: 'MEMBER',
}

export const events = {
  LOGIN: {
    REQUEST: 'LOGIN_REQUEST',
    SUCCESS: 'LOGIN_SUCCESS',
    FAIL: 'LOGIN_FAIL',
  },
  LOGOUT: 'LOGOUT',
  AUTHENTICATION: {
    SUCCESS: 'AUTHENTICATION_SUCCESS',
    FAIL: 'AUTHENTICATION_FAIL',
  },
}

export const onEntry = state => 'a:entry:' + state

export const onExit = state => 'a:exit:' + state

export const onTransition = event => 'a:transition:' + event

export const statechart = [
  {
    id: states.STRANGER,
    transitions: [
      {
        event: events.AUTHENTICATION.SUCCESS,
        target: states.MEMBER,
      },
      {
        event: events.AUTHENTICATION.FAIL,
        target: states.GUEST,
      },
    ],
  },
  {
    id: states.LOGGING_IN,
    transitions: [
      {
        event: events.LOGIN.SUCCESS,
        target: states.MEMBER,
      },
      {
        event: events.LOGIN.FAIL,
        target: states.GUEST,
      },
    ],
  },
  {
    id: states.GUEST,
    transitions: [
      {
        event: events.LOGIN.REQUEST,
        target: states.LOGGING_IN,
      },
    ],
  },
  {
    id: states.MEMBER,
    transitions: [
      {
        event: events.LOGOUT,
        target: states.GUEST,
      },
    ],
  },
]
