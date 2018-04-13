import React from 'react'
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'

const AuthRouteComponent = ({ component: Component, isUser, isAuthenticated, location, ...rest }) => (
  <Route
    {...rest}
    render={props => isAuthenticated && !isUser ? (
      <Redirect
        to={{
          pathname: "/login",
          state: {from: location},
        }}
      />
    ) : (
      <Component {...props} />
    )}
  />
)

export const AuthRoute = connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isUser: state.auth.isUser,
  }),
)(AuthRouteComponent)
