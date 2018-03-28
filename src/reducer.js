import {combineReducers} from 'redux'

import {sprayingReducer} from 'spraying/spraying.reducer'
import {authReducer} from 'auth/auth.reducer'
import {machine, UPDATE} from 'machine'

export function statechartReducer(state = machine.initialState, action) {
  if (action.type === UPDATE) {
    return action.payload
  }
  return state
}

export const reducer = combineReducers({
  spraying: sprayingReducer,
  auth: authReducer,
  statechart: statechartReducer,
})
