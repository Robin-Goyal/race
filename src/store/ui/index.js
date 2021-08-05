import { handleActions } from 'redux-actions'
import produce from 'immer'
import types from './types'

const initialState = {
  openModals: []
}

const reducer = {
  [types.TOGGLE_MODAL]: (state, { payload }) =>
    produce(state, (draft) => {
      if (draft.openModals.includes(payload)) {
        draft.openModals = draft.openModals.filter((m) => m !== payload)
      } else {
        draft.openModals.push(payload)
      }
    })
}

export const uiReducer = handleActions(reducer, initialState, {
  prefix: types.PREFIX
})
