import {onEntry} from 'statechart'
import {appStates} from 'app/app.statechart'

const initialState = {
  locale: 'hu',
}

export const appReducer = (state = initialState, action) => {
  switch(action.type) {
    case onEntry(appStates.INITIALIZED):
      return {
        locale: action.locale,
      }

    default:
      return state
  }
}
