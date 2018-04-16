import update from 'immutability-helper'

import {onEntry, onExit, onTransition} from 'statechart'
import {authStates as states, authEvents as events} from 'auth/auth.statechart'

const initialState = {
  isStranger: true,
  isGuest: false,
  username: '',
  message: '',
}

export const authReducer = (state = initialState, action) => {
  switch(action.type) {
    // STRANGER
    case onExit(states.STRANGER):
      return update(state, {isStranger: {$set: false}})

    // MEMBER
    case onEntry(states.MEMBER):
      return update(state, {username: {$set: action.username}})

    // GUEST
    case onEntry(states.GUEST):
      return update(state, {isGuest: {$set: true}})

    case onExit(states.GUEST):
      return update(state, {
        message: {$set: ''},
        isGuest: {$set: false},
      })

    // TRANSITIONS
    case onTransition(events.LOGIN.FAIL):
      return update(state, {message: {$set: action.message}})

    default:
      return state
  }
}
