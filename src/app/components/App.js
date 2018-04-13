import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Nav, Navbar} from 'react-bootstrap'
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom'

import {UserInfo} from 'auth/components/UserInfo'
import {Navigation} from 'app/components/Navigation'
import {LocaleSwitch} from 'app/components/LocaleSwitch/LocaleSwitch'
import {changeLocale} from 'app/app.actions'
import {routes} from 'routes'
import {LoginPage} from 'auth/components/LoginPage'
import {HomePage} from 'home/components/HomePage'
import {SprayingPage} from 'spraying/components/SprayingPage'

class AppComponent extends Component {
  render() {
    const props = this.props

    const nav = (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/home">G&G | Spraying</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <Navigation
            routes={routes}
            isUser={props.auth.isUser}
          />
        </Nav>
        <Nav
          pullRight
        >
          <LocaleSwitch
            locale={props.app.locale}
            changeLocale={props.changeLocale}
          />
          <UserInfo
            isUser={props.auth.isUser}
            username={props.auth.username}
            logout={props.logout}
          />
        </Nav>
      </Navbar>
    )

    if(!props.auth.isAuthenticated) return <div>authenticating, please wait...</div>

    return (
      <Router>
        <div>
          {nav}
          <Route
            path="/"
            render={({location: {pathname}}) => !props.auth.isUser && pathname !== '/login' && (
              <Redirect
                to="/login"
              />
            )}
          />
          <Route
            exact
            path="/login"
            component={LoginPage}
          />
          <Route
            path="/home"
            component={HomePage}
          />
          <Route
            path="/spraying"
            component={SprayingPage}
          />
        </div>
      </Router>
    )
  }
}

export const App = connect(
  state => ({
    app: state.app,
    auth: state.auth,
  }),
  dispatch => bindActionCreators({
    changeLocale,
  }, dispatch),
)(AppComponent)
