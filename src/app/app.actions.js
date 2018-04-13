export const appActions = {
  changeLocale: 'CHANGE_LOCALE',
}

export const changeLocale = locale => {
  return {
    type: appActions.changeLocale,
    locale,
  }
}