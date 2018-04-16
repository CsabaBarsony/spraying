import {dispatch} from 'store'
import {onEntry} from 'statechart'
import {appStates, appEvents} from 'app/app.statechart'

export const appApi = action => {
  switch (action.type) {
    case onEntry(appStates.APP):
      setTimeout(() => {
        let locale = localStorage.getItem('locale')

        if(!locale) {
          localStorage.setItem('locale', 'en')
          locale = 'en'
        }

        dispatch({
          type: appEvents.INITIALIZATION_READY,
          locale,
        })
      }, 0)
      break

    default:
      break
  }
}
