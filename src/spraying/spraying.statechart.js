export const sprayingStates = {
  SPRAYING: 'SPRAYING',
  LOADING: 'SPRAYING/LOADING',
  SECTIONS: 'SPRAYING/SECTIONS',
}

export const sprayingEvents = {
  SECTIONS_LOADED: 'SPRAYING/SECTIONS_LOADED',
  SET_OPTIONS: 'SET_OPTIONS',
}

export const sprayingStatechart = {
  id: sprayingStates.SPRAYING,
  states: [
    {
      id: sprayingStates.LOADING,
      transitions: [
        {
          event: sprayingEvents.SECTIONS_LOADED,
          target: sprayingStates.SECTIONS,
        },
      ],
    },
    {
      id: sprayingStates.SECTIONS,
      transitions: [
        {
          event: sprayingEvents.SET_OPTIONS,
          target: sprayingStates.SECTIONS,
        }
      ],
    },
  ],
}
