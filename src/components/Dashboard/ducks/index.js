import { handleActions } from 'redux-actions'
import produce from 'immer'
import types from './types'

const initialState = {
  isLoading: true,
  errors: {},
  latestNapSelection: {}
}

const reducer = {
  [types.FETCH_LATEST_NAP_SELECTION_DATA]: (state) =>
    produce(state, (draft) => {
      draft.isLoading = true
    }),

  [types.FETCH_LATEST_NAP_SELECTION_DATA_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.isLoading = false
      draft.latestNapSelection = payload.data
    }),

  [types.FETCH_LATEST_NAP_SELECTION_DATA_FAILED]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.isLoading = false
      draft.errors = payload
    })
}

export const dashboardReducer = handleActions(reducer, initialState, {
  prefix: types.PREFIX
})
