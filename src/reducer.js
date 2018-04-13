import {combineReducers} from 'redux'

import {appReducer} from 'app/app.reducer'
import {sprayingReducer} from 'spraying/spraying.reducer'
import {authReducer} from 'auth/auth.reducer'

export const reducer = combineReducers({
  app: appReducer,
  spraying: sprayingReducer,
  auth: authReducer,
})
