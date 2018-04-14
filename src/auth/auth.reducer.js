import update from 'immutability-helper'

import {onEntry, onExit, onTransition, events, states} from 'statechart'

const initialState = {
  isStranger: true,
  isGuest: false,
  username: '',
  message: '',
}

export const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case onExit(states.STRANGER):
      return update(state, {isStranger: {$set: false}})

    case onTransition(events.AUTHENTICATION.SUCCESS):
      return update(state, {
        username: {$set: action.username},
      })

    case onEntry(states.MEMBER):
      return update(state, {
        isGuest: {$set: false},
        username: {$set: action.username},
      })

    case onEntry(states.GUEST):
      return update(state, {isGuest: {$set: true}})

    default:
      return state
  }
}
