export const actions = {
  selectSection: 'SELECT_SECTION',
  closePopup: 'CLOSE_POPUP',
}

export const selectSection = sectionId => ({
  type: actions.selectSection,
  sectionId,
})

export const closePopup = () => ({
  type: actions.closePopup,
})
