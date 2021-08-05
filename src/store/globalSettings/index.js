import { handleActions } from 'redux-actions'
import produce from 'immer'
import types from './types'

const initialState = {
  isNationalitiesShown: false,
  isHideComments: false,
  isNonRunnersShown: false,
  isFractionalOddsShown: false,
  isHintsDisabel: false,
  isNotificationsDisabled: false
}

const reducer = {
  [types.TOGGLE_SHOW_NATIONALITY]: (state) =>
    produce(state, (draft) => {
      draft.isNationalitiesShown = !draft.isNationalitiesShown
    }),
  [types.TOGGLE_HIDE_COMMENTS]: (state) =>
    produce(state, (draft) => {
      draft.isHideComments = !draft.isHideComments
    }),
  [types.TOGGLE_DISABLE_HINTS]: (state) =>
    produce(state, (draft) => {
      draft.isHintsDisabel = !draft.isHintsDisabel
    }),
  [types.TOGGLE_DISABLE_NOTIFICATIONS]: (state) =>
    produce(state, (draft) => {
      draft.isNotificationsDisabled = !draft.isNotificationsDisabled
    }),
  [types.TOGGLE_SHOW_NONRUNNERS]: (state) =>
    produce(state, (draft) => {
      draft.isNonRunnersShown = !draft.isNonRunnersShown
    }),
  [types.TOGGLE_SHOW_FRATIONAL_ODDS]: (state) =>
    produce(state, (draft) => {
      draft.isFractionalOddsShown = !draft.isFractionalOddsShown
    })
}

export const globalSettingsReducer = handleActions(reducer, initialState, {
  prefix: types.PREFIX
})
