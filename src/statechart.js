import {authStatechart} from 'auth/auth.statechart'
import {appStatechart} from 'app/app.statechart'

export const onEntry = state => 'a:entry:' + state

export const onExit = state => 'a:exit:' + state

export const onTransition = event => 'a:transition:' + event

export const statechart = [
  {
    id: 'MAIN',
    $type: 'parallel',
    states: [
      authStatechart,
      appStatechart,
    ],
  },
]
