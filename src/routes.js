import React from 'react'

import {LoginPage} from 'auth/components/LoginPage'
import {SprayingPage} from 'spraying/components/SprayingPage'

export const routes = [
  {
    path: '/login',
    title: 'Login',
    isAuthenticated: false,
    page: () => <LoginPage/>,
  },
  {
    path: '/home',
    title: 'Home',
    isAuthenticated: false,
    page: () => (<div>home</div>),
  },
  {
    path: '/spraying',
    title: 'Spraying',
    isAuthenticated: true,
    page: () => <SprayingPage/>,
  },
]
