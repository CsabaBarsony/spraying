import {store} from 'store'
import {locales} from 'app/utils/locales'

export const i18n = {
  /**
   * @param key {locales}
   * @param isFirstLetterCapital {?boolean}
   * @returns {string}
   */
  translate: (key, isFirstLetterCapital = true) => {
    const locale = store.getState().app.locale

    const resultStringLowerCase = locales[key][locale]

    if(isFirstLetterCapital) {
      return resultStringLowerCase.charAt(0).toUpperCase() + resultStringLowerCase.slice(1)
    }
    else {
      return resultStringLowerCase
    }
  },
  format: (value, type) => {
    return value
  },
}
