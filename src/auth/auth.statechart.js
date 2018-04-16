export const authStates = {
  AUTH: 'AUTH',
  STRANGER: 'STRANGER',
  LOGGING_IN: 'LOGGING_IN',
  GUEST: 'GUEST',
  MEMBER: 'MEMBER',
}

export const authEvents = {
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
  CHANGE_LOCALE: 'CHANGE_LOCALE',
}

export const authStatechart =   {
  id: authStates.AUTH,
  states: [
    {
      id: authStates.STRANGER,
      transitions: [
        {
          event: authEvents.AUTHENTICATION.SUCCESS,
          target: authStates.MEMBER,
        },
        {
          event: authEvents.AUTHENTICATION.FAIL,
          target: authStates.GUEST,
        },
      ],
    },
    {
      id: authStates.LOGGING_IN,
      transitions: [
        {
          event: authEvents.LOGIN.SUCCESS,
          target: authStates.MEMBER,
        },
        {
          event: authEvents.LOGIN.FAIL,
          target: authStates.GUEST,
        },
      ],
    },
    {
      id: authStates.GUEST,
      transitions: [
        {
          event: authEvents.LOGIN.REQUEST,
          target: authStates.LOGGING_IN,
        },
      ],
    },
    {
      id: authStates.MEMBER,
      transitions: [
        {
          event: authEvents.LOGOUT,
          target: authStates.GUEST,
        },
      ],
    },
  ],
}
