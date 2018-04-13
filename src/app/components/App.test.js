import React from 'react'
import ReactDOM from 'react-dom'

import {App} from 'app/components/App'
import {store} from 'store'

it('renders', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App store={store} />, div)
})
