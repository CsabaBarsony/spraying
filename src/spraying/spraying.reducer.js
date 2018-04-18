import update from 'immutability-helper'

import {onEntry} from 'statechart'
import {sprayingStates} from 'spraying/spraying.statechart'

const initialState = {
  sections: [],
  campaignDescription: {},
  campaignSummary: {},
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

    default:
      return state
  }
}
