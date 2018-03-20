import {createStore} from 'redux'
import update from 'immutability-helper'

import {sections} from './api'

const initialState = {
  sections,
  selectedSection: null,
  popupIsOpened: false,
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'selectSection':
      const selectedSection = sections.find(section => section.id === action.sectionId)

      return update(state, {
        selectedSection: {
          $set: selectedSection,
        },
        popupIsOpened: {
          $set: true,
        },
      })
    case 'closePopup':
      return update(state, {
        popupIsOpened: {
          $set: false,
        },
      })
    default:
      return state
  }
}

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)
