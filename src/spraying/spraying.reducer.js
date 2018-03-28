import update from 'immutability-helper'

import {actions} from 'actions'
import {sections} from 'api'

const initialState = {
  sections,
  selectedSection: null,
  popupIsOpened: false,
}

export function sprayingReducer(state = initialState, action) {
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
