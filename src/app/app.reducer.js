import {appActions} from 'app/app.actions'

const initialState = {
  locale: 'hu',
}

export const appReducer = (state = initialState, action) => {
  switch(action.type) {
    case appActions.changeLocale:
      return {
        locale: action.locale,
      }

    default:
      return state
  }
}
