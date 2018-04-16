export const appStates = {
  APP: 'APP',
  LOCALE: 'LOCALE',
}

export const appEvents = {
  CHANGE_LOCALE: 'CHANGE_LOCALE',
}

export const appStatechart =   {
  id: appStates.APP,
  states: [
    {
      id: appStates.LOCALE,
      transitions: [
        {
          event: appEvents.CHANGE_LOCALE,
          target: appStates.CHANGE_LOCALE,
        },
      ],
    },
  ],
}
