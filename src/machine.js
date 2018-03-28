import {Machine} from 'xstate'
import {authActions} from 'auth/auth.actions'

export const UPDATE = 'UPDATE'
export const ON_GUEST_ENTRY = 'ON_GUEST_ENTRY'

const authStates = {
  unauthenticated: 'auth/UNAUTHENTICATED',
  user: 'auth/USER',
  guest: 'auth/GUEST',
}

const statechart = {
  // initial: [authStates.unauthenticated],
  initial: '1',
  states: {
    1: {
      states: {
        3: {
          on: {
            test: '2',
          },
        },
      },
      on: {
        test: '2',
      },
    },
    2: {
      on: {
        test: '1.3',
      },
    },
    [authStates.unauthenticated]: {
      on: {
        [authActions.authenticate.success]: authStates.user,
        [authActions.authenticate.fail]: authStates.guest,
      },
    },
    [authStates.guest]: {
      on: {
        [authActions.login.success]: authStates.user,
        [authActions.login.fail]: authStates.guest,
      },
    },
    [authStates.user]: {
      onEntry: authActions.enter.user,
      on: {
        test: authStates.guest,
      },
    },
  },
}

export const machine = Machine(statechart)
