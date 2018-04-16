import React, {Component} from 'react'
import {connect} from 'react-redux'
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'

import {authEvents} from 'auth/auth.statechart'

class LoginPageComponent extends Component {
  state = {
    username: 'Test user',
    password: 'pass',
  }

  render() {
    const props = this.props
    const state = this.state

    return (
      <form>
        <FormGroup>
          <ControlLabel>username</ControlLabel>
          <FormControl
            type="text"
            value={state.username}
            onChange={e => this.setState({username: e.target.value})}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>password</ControlLabel>
          <FormControl
            type="password"
            value={state.password}
            onChange={e => this.setState({password: e.target.value})}
          />
        </FormGroup>
        {props.message && <div>message: {props.message}</div>}
        <Button onClick={() => props.login(state.username, state.password)}>Login</Button>
      </form>
    )
  }
}

export const LoginPage = connect(
  state => ({message: state.auth.message}),
  dispatch => ({
    login: (username, password) => dispatch({
      type: authEvents.LOGIN.REQUEST,
      username,
      password,
    })
  }),
)(LoginPageComponent)
