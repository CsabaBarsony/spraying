import {appEvents} from 'app/app.statechart'
import {onTransition} from 'statechart'

const initialState = {
  locale: 'hu',
}

export const appReducer = (state = initialState, action) => {
  switch(action.type) {
    case onTransition(appEvents.CHANGE_LOCALE):
      return {
        locale: action.locale,
      }

    default:
      return state
  }
}
