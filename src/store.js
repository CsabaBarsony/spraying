import {createStore, applyMiddleware} from 'redux'

import {reducer} from 'reducer'
import {machine, UPDATE} from 'machine'

export const statechartMiddleware = store => next => action => {
  const state = store.getState()
  const currentStatechart = state.statechart // this has to match the location where you mount your reducer

  const nextMachine = machine.transition(currentStatechart, action)

  const result = next(action)

  // run actions
  nextMachine.actions.forEach(actionType => {
    store.dispatch({ type: actionType, payload: action.payload })
  })

  // save current statechart
  if (nextMachine && action.type !== UPDATE) {
    if (nextMachine.history !== undefined) {
      // if there's a history, it means a transition happened
      store.dispatch({ type: UPDATE, payload: nextMachine.value })
    }
  }

  return result
}

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(statechartMiddleware),
)

machine.initialState.actions.forEach(actionType =>
  store.dispatch({ type: actionType }))
