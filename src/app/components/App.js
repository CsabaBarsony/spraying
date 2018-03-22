import React, {Component} from 'react'
import {Navbar} from 'react-bootstrap'

import {SprayingPage} from 'spraying/components/SprayingPage'

export class App extends Component {
  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">G&G | Spraying</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <div
          style={{paddingLeft: 10, paddingRight: 10}}
        >
          <SprayingPage/>
        </div>
      </div>
    )
  }
}
