import { handleActions } from 'redux-actions'
import produce from 'immer'
import types from './types'

const initialState = {
  data: {},
  horsesData: [],
  isLoading: false,
  error: null
}

const reducer = {
  [types.SET_ITEM_DATA]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.data = payload
    }),
  [types.RESET_ITEM_DATA]: (state) =>
    produce(state, (draft) => {
      draft.data = null
    })
}

export const nagmeGlobalReducer = handleActions(reducer, initialState, {
  prefix: types.PREFIX
})
