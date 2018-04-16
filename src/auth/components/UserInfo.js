import React from 'react'
import {NavDropdown, MenuItem, NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

export const UserInfo = props => props.isUser ? (
  <NavDropdown
    id="auth-UserInfo-NavDropdown"
    title={props.username}
  >
    <MenuItem onClick={props.logout}>logout</MenuItem>
  </NavDropdown>
) : (
  <LinkContainer to="/login">
    <NavItem>login</NavItem>
  </LinkContainer>
)
