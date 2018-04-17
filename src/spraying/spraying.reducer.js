import update from 'immutability-helper'

import {onEntry} from 'statechart'
import {sprayingStates} from 'spraying/spraying.statechart'

const initialState = {
  sections: [],
  campaignDescription: {},
  campaignSummary: {},
  selectedSectionId: null,
  popupIsOpened: false,
  isSectionsLoading: true,
}

export function sprayingReducer(state = initialState, action) {
  switch(action.type) {
    // SECTIONS
    case onEntry(sprayingStates.SECTIONS):
      return update(state, {
        sections: {$set: action.sections},
        campaignDescription: {$set: action.campaignDescription},
        campaignSummary: {$set: action.campaignSummary},
        isSectionsLoading: {$set: false},
      })

    // POPUP_OPENED
    case onEntry(sprayingStates.POPUP_OPENED):
      return update(state, {
        popupIsOpened: {$set: true},
        selectedSectionId: {$set: action.sectionId},
      })

    // POPUP_CLOSED
    case onEntry(sprayingStates.POPUP_CLOSED):
      return update(state, {popupIsOpened: {$set: false}})

    default:
      return state
  }
}
