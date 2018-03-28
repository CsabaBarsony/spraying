export const actions = {
  selectSection: 'SELECT_SECTION',
  closePopup: 'CLOSE_POPUP',
  login: 'LOGIN',
  logout: 'LOGOUT',
}

export const selectSection = sectionId => ({
  type: actions.selectSection,
  sectionId,
})

export const closePopup = () => ({
  type: actions.closePopup,
})

export const login = () => ({
  type: actions.login,
})

export const logout = () => ({
  type: actions.logout,
})
