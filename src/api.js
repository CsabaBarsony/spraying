import {appApi} from 'app/app.api'
import {authApi} from 'auth/auth.api'
import {sprayingApi} from 'spraying/spraying.api'

export const api = action => {
  appApi(action)
  authApi(action)
  sprayingApi(action)
}
