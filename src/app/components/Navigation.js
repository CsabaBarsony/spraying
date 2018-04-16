import React from 'react'
import {NavDropdown, NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

import {translate, locales} from 'app/utils/i18n'

export const Navigation = () => (
  <NavDropdown
    id="auth-Navigation-NavDropdown"
    title={translate(locales.PAGES)}
  >
    <LinkContainer to="/home">
      <NavItem>{translate(locales.HOME)}</NavItem>
    </LinkContainer>
    <LinkContainer to="/spraying">
      <NavItem>{translate(locales.SPRAYING)}</NavItem>
    </LinkContainer>
  </NavDropdown>
)
