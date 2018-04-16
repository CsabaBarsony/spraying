export {locales} from 'app/utils/locales'

export const translate = (key, isFirstLetterCapital = true) => {
  const storedLocale = localStorage.getItem('locale')
  const locale = storedLocale || 'en'

  const resultStringLowerCase = key[locale] || key['en']

  if(isFirstLetterCapital) {
    return resultStringLowerCase.charAt(0).toUpperCase() + resultStringLowerCase.slice(1)
  }
  else {
    return resultStringLowerCase
  }
}

export const format = (value, type) => {
  return value
}
