import update from 'immutability-helper'

import {onExit, onTransition} from 'statechart'
import {sprayingStates, sprayingEvents} from 'spraying/spraying.statechart'

const initialState = {
  sections: [],
  campaignDescription: {},
  campaignSummary: {},
  isSectionsLoading: true,
  isWeedInfectionDetailsVisible: false,
  chemicalDetailsVisible: [],
}

export function sprayingReducer(state = initialState, action) {
  switch(action.type) {
    // SECTIONS
    case onExit(sprayingStates.LOADING):
      return update(state, {
        sections: {$set: action.sections},
        campaignDescription: {$set: action.campaignDescription},
        campaignSummary: {$set: action.campaignSummary},
        isSectionsLoading: {$set: false},
      })

    // TRANSITION
    case onTransition(sprayingEvents.SET_OPTIONS):
      return update(state, {
        isWeedInfectionDetailsVisible: {$set: action.isWeedInfectionDetailsVisible},
        chemicalDetailsVisible: {$set: action.chemicalDetailsVisible},
      })

    default:
      return state
  }
}
