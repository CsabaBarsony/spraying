import {createStore, applyMiddleware} from 'redux'
// import {Statechart} from 'scion-core'

import {Statechart} from 'app/utils/scion'
import {reducer} from 'reducer'
import {statechart} from 'statechart'
import {api} from 'api'

let sc

setTimeout(() => {
  sc = new Statechart({states: statechart})

  sc.on('onEntry', (state, event = {}) => {
    const action = {...event}
    action.type = 'a:entry:' + state
    console.log('entry', state, action)
    store.dispatch(action)
  })

  sc.on('onExit', (state, event = {}) => {
    const action = {...event}
    action.type = 'a:exit:' + state
    console.log('exit', state, action)
    store.dispatch(action)
  })

  sc.on('onTransition', (state, targetIds, stxIdx, event) => {
    if(event && event.type) {
      const action = {...event}
      action.type = 'a:transition:' + event.type
      console.log('transition', action)
      store.dispatch(action)
    }
  })

  sc.start()
}, 0)

const apiMiddleware = store => next => action => {
  api(action)
  next(action)
}

const statechartMiddleware = store => next => action => {
  if(!action.type.startsWith('a:')) {
    sc.gen({
      name: action.type,
      data: action,
    })
  }
  else {
    next(action)
  }
}

const logMiddleware = store => next => action => {
  // console.log(action.type.startsWith('e:') ? 'event' : 'action', action)
  next(action)
}

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(logMiddleware, statechartMiddleware, apiMiddleware),
)

export const {dispatch} = store
