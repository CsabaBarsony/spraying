import {createStore, applyMiddleware} from 'redux'
import {Statechart} from 'scion-core'

import {reducer} from 'reducer'
import {statechart} from 'statechart'
import {api} from 'api'

const apiMiddleware = store => next => action => {
  api(action)
  next(action)
}

const spirit = (statechart, opts) => {
  let sc
  const options = opts || {}

  setTimeout(() => {
    sc = new Statechart({states: statechart})

    let lastEvent

    if(options.log && options.verbose) {
      sc.on('onBigStepBegin', () => console.log('big step begin'))
      sc.on('onBigStepEnd', () => console.log('big step end'))
      sc.on('onSmallStepBegin', e => console.log('small step begin', e))
      sc.on('onSmallStepEnd', () => console.log('small step end'))
    }

    sc.on('onSmallStepBegin', e => lastEvent = e ? e.data : undefined)

    sc.on('onEntry', state => {
      const action = {...lastEvent}
      action.type = 'a:entry:' + state
      options.log && console.log('entry', state, action)
      store.dispatch(action)
    })

    sc.on('onExit', state => {
      const action = {...lastEvent}
      action.type = 'a:exit:' + state
      options.log && console.log('exit', state, action)
      store.dispatch(action)
    })

    sc.on('onTransition', (state, targetIds, stxIdx) => {
      if(lastEvent && lastEvent.type) {
        const action = {...lastEvent}
        action.type = 'a:transition:' + lastEvent.type
        options.log && console.log('transition', action)
        store.dispatch(action)
      }
    })

    sc.start()
  }, 0)

  return store => next => action => {
    if(!action.type.startsWith('a:')) {
      if(options.log) console.log('event', action)
      sc.gen({
        name: action.type,
        data: action,
      })
    }
    else {
      if(options.log) console.log('action', action)
      next(action)
    }
  }
}

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(spirit(statechart, {log: false}), apiMiddleware),
)

export const {dispatch} = store
