import { createActions } from 'redux-actions'

import types from './types'

const identityActions = [types.TOGGLE_MODAL]

export const { toggleModal } = createActions({}, ...identityActions, {
  prefix: types.PREFIX
})
