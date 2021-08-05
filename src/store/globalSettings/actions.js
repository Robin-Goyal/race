import { createActions } from 'redux-actions'

import types from './types'

const identityActions = [
  types.TOGGLE_SHOW_NATIONALITY,
  types.TOGGLE_HIDE_COMMENTS,
  types.TOGGLE_DISABLE_NOTIFICATIONS,
  types.TOGGLE_SHOW_NONRUNNERS,
  types.TOGGLE_SHOW_FRACTIONAL_ODDS,
  types.TOGGLE_DISABLE_HINTS
]

export const {
  toggleShowNationality,
  toggleHideComments,
  toggleDisableNotifications,
  toggleShowNonrunners,
  toggleShowFractionalOdds,
  toggleDisableHints
} = createActions({}, ...identityActions, {
  prefix: types.PREFIX
})
