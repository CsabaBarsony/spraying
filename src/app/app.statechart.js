export const appStates = {
  APP: 'APP',
  UNINITIALIZED: 'APP/UNINITIALIZED',
  INITIALIZED: 'APP/INITIALIZED',
}

export const appEvents = {
  INITIALIZATION_READY: 'INITIALIZATION_READY',
}

export const appStatechart =   {
  id: appStates.APP,
  states: [
    {
      id: appStates.UNINITIALIZED,
      transitions: [
        {
          event: appEvents.INITIALIZATION_READY,
          target: appStates.INITIALIZED,
        },
      ],
    },
    {
      id: appStates.INITIALIZED
    },
  ],
}
