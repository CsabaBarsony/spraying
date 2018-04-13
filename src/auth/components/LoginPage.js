import React, {Component} from 'react'
import {connect} from 'react-redux'
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'

import {events} from 'statechart'

class LoginPageComponent extends Component {
  state = {
    username: 'asdf',
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
        <div>message: {props.message}</div>
        <Button
          onClick={() => props.login(state.username, state.password)}
        >Login</Button>
      </form>
    )
  }
}

export const LoginPage = connect(
  state => ({
    message: state.auth.message,
  }),
  dispatch => ({
    login: (username, password) => dispatch({
      type: events.LOGIN.REQUEST,
      data: {
        username,
        password,
      },
    })
  }),
)(LoginPageComponent)
