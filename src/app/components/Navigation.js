import React from 'react'
import {NavDropdown, NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {arrayOf, shape, bool, string} from 'prop-types'

export const Navigation = props => (
  <NavDropdown
    id="auth-Navigation-NavDropdown"
    title="Pages"
  >
    {props.routes.map((route, index) => !props.isUser ? null : (
        <LinkContainer
          key={index}
          to={route.path}
        >
          <NavItem>{route.title}</NavItem>
        </LinkContainer>
      )
    )}
  </NavDropdown>
)

Navigation.propTypes = {
  routes: arrayOf(shape({
    path: string.isRequired,
    title: string.isRequired,
    isAuthenticated: bool.isRequired,
  })).isRequired,
}
