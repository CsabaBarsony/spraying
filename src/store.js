import {createStore, combineReducers, applyMiddleware} from 'redux'
import update from 'immutability-helper'
import {Machine} from 'xstate'

import {sections} from 'api'
import {actions} from 'actions'

const UPDATE = 'UPDATE'
const INCREMENT = 'INCREMENT'

const initialState = {
  sections,
  selectedSection: null,
  popupIsOpened: false,
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case actions.selectSection:
      const selectedSection = sections.find(section => section.id === action.sectionId)

      return update(state, {
        selectedSection: {
          $set: selectedSection,
        },
        popupIsOpened: {
          $set: true,
        },
      })
    case actions.closePopup:
      return update(state, {
        popupIsOpened: {
          $set: false,
        },
      })
    default:
      return state
  }
}

export function statechartReducer(state = machine.initialState, action) {
  if (action.type === UPDATE) {
    return action.payload
  }
  return state
}

const statechart = {
  initial: 'Init',
  states: {
    Init: {
      on: { CLICKED_PLUS: 'Init.Increment' },
      states: {
        Increment: {
          onEntry: INCREMENT
        }
      }
    }
  }
}

const machine = Machine(statechart)

const statechartMiddleware = store => next => action => {
  const state = store.getState()
  const currentStatechart = state.statechart // this has to match the location where you mount your reducer

  const nextMachine = machine.transition(currentStatechart, action)

  const result = next(action)

  // run actions
  nextMachine.actions.forEach(actionType =>
    store.dispatch({ type: actionType, payload: action.payload }))

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
  combineReducers({
    reducer,
    statechart: statechartReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(statechartMiddleware),
)
