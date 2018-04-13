import React from 'react'
import {NavDropdown, MenuItem} from 'react-bootstrap'

import './LocaleSwitch.css'

const locales = [
  {
    key: 'hu',
    name: 'Magyar',
    src: 'img/hu.svg',
  },
  {
    key: 'en',
    name: 'English',
    src: 'img/gb.svg',
  },
  {
    key: 'de',
    name: 'Deutsch',
    src: 'img/de.svg',
  },
]

const LocaleComponent = ({locale}) => (
  <span>
    <img src={locale.src} alt={locale.key} />
    <span>{locale.name}</span>
  </span>
)

export const LocaleSwitch = props => (
  <NavDropdown
    id="app-LocaleSwitch"
    className="LocaleSwitch"
    title={(
      <LocaleComponent
        locale={locales.find(l => l.key === props.locale)}
        changeLocale={() => {}}
      />
    )}
  >
    {locales.filter(l => l.key !== props.locale).map((locale, index) => (
      <MenuItem
        key={index}
        onClick={() => props.changeLocale(locale.key)}
      >
        <LocaleComponent
          locale={locale}
        />
      </MenuItem>
    ))}
  </NavDropdown>
)
