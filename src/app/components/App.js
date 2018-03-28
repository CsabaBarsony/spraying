import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Nav, Navbar} from 'react-bootstrap'
import {BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'

// import {SprayingPage} from 'spraying/components/SprayingPage'
import {HomePage} from 'home/components/HomePage'
import {AuthRoute} from 'auth/components/AuthRoute'
import {LoginPage} from 'auth/components/LoginPage'
import {UserInfo} from 'auth/components/UserInfo'
import {login, logout} from 'actions'
import {authApi} from 'auth/auth.api'

class AppComponent extends Component {
  componentDidMount() {
    authApi.authenticate()
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/home">G&G | Spraying</Link>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <UserInfo
                isAuthenticated={this.props.auth.isAuthenticated}
                username={this.props.auth.username}
                logout={this.props.logout}
              />
            </Nav>
          </Navbar>
          <div
            style={{paddingLeft: 10, paddingRight: 10}}
          >
            <button
              onClick={this.props.test}
            >app_start</button>
            {/*<SprayingPage/>*/}
            <Route path="/login" render={props => (
              <LoginPage
                login={this.props.login}
                redirectToReferrer={this.props.auth.redirectToReferrer}
                {...props}
              />
            )}/>
            <Route path="/home" component={HomePage}/>
            <AuthRoute path="/spraying" component={() => <div>spraying</div>}/>
            <Switch>
              <Redirect from="/" to="/home" exact/>
            </Switch>
            {/*<AuthRoute path="/abc" component={() => <div>abc</div>} />*/}
          </div>
        </div>
      </Router>
    )
  }
}

export const App = connect(
  state => ({
    auth: state.auth,
  }),
  dispatch => bindActionCreators({
    login,
    logout,
    test: () => ({type: 'test'}),
  }, dispatch),
)(AppComponent)
