import React from 'react'
import {shallow} from 'enzyme'
import {LinkContainer} from 'react-router-bootstrap'
import {NavItem} from 'react-bootstrap'

import {Navigation} from 'app/components/Navigation'

const routes = [
  {
    path: '/home',
    title: 'Home',
    isAuthenticated: false,
  },
  {
    path: '/spraying',
    title: 'Spraying',
    isAuthenticated: true,
  },
]

it('should render 1 route', () => {
  const navigation = shallow(
    <Navigation
      isUser={false}
      routes={routes}
    />
  )

  const linkContainers = navigation.find(LinkContainer)

  expect(linkContainers).toHaveLength(1)
  expect(linkContainers.at(0).props().to).toEqual('/home')
})

it('should render 2 routes', () => {
  const navigation = shallow(
    <Navigation
      isUser={true}
      routes={routes}
    />
  )

  const linkContainers = navigation.find(LinkContainer)

  expect(linkContainers).toHaveLength(2)
  expect(linkContainers.at(0).props().to).toEqual('/home')
  expect(linkContainers.at(0).find(NavItem).children().text()).toEqual('Home')
  expect(linkContainers.at(1).props().to).toEqual('/spraying')
  expect(linkContainers.at(1).find(NavItem).children().text()).toEqual('Spraying')
})
