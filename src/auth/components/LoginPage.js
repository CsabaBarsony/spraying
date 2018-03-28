import React from 'react'
import {Redirect} from 'react-router-dom'
import {Button} from 'react-bootstrap'

export const LoginPage = props => {
  const {from} = props.location.state || { from: { pathname: '/home' } }

  if (props.redirectToReferrer) {
    return <Redirect to={from} />
  }

  return (
    <Button
      onClick={props.login}
    >Log in</Button>
  )
}
