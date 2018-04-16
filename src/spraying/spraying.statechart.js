export const sprayingStates = {
  SPRAYING: 'SPRAYING',
  POPUP_OPENED: 'SPRAYING/POPUP_OPENED',
  POPUP_CLOSED: 'SPRAYING/POPUP_CLOSED',
  LOADING: 'SPRAYING/LOADING',
  SECTIONS: 'SPRAYING/SECTIONS',
}

export const sprayingEvents = {
  SECTIONS_LOADED: 'SPRAYING/SECTIONS_LOADED',
  SELECT_SECTION: 'SPRAYING/SELECT_SECTION',
  CLOSE_POPUP: 'SPRAYING/CLOSE_POPUP',
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
      states: [
        {
          id: sprayingStates.POPUP_CLOSED,
          transitions: [
            {
              event: sprayingEvents.SELECT_SECTION,
              target: sprayingStates.POPUP_OPENED,
            },
          ],
        },
        {
          id: sprayingStates.POPUP_OPENED,
          transitions: [
            {
              event: sprayingEvents.SELECT_SECTION,
              target: sprayingStates.POPUP_OPENED,
            },
            {
              event: sprayingEvents.CLOSE_POPUP,
              target: sprayingStates.POPUP_CLOSED,
            },
          ],
        },
      ],
    },
  ],
}
