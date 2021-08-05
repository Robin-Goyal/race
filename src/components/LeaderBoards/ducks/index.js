import { handleActions } from 'redux-actions'
import produce from 'immer'

import types from './types'

const initialState = {
  loading: false,
  rows: [],
  updated_at: '',
  settings: {},
  errors: {},
  pagination: {
    totalPages: 0,
    pageSize: 20
  },
  napsDetailInfo: {},
  selectedName: ''
}

const reducer = {
  [types.FETCH_DATA]: (state) =>
    produce(state, (draft) => {
      draft.loading = true
      draft.selectedName = ''
    }),
  [types.FETCH_DATA_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false
      draft.rows = payload.rows
      draft.updated_at = payload.updated_at
      draft.settings = payload.settings
      draft.pagination.totalPages = payload.total_pages
      draft.selectedName = payload.selectedName || ''
    }),
  [types.FETCH_DATA_FAILED]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false
      draft.errors = payload
      draft.rows = []
      draft.updated_at = ''
      draft.total_pages = 1
      draft.settings = {}
      draft.selectedName = ''
      draft.pagination.totalPages = 0
    }),
  [types.FETCH_NAP_DATA_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.napsDetailInfo = payload
    }),
  [types.FETCH_NAP_DATA_FAILED]: (state) =>
    produce(state, (draft) => {
      draft.napsDetailInfo = {}
    })
}

export const leaderboardReducer = handleActions(reducer, initialState, {
  prefix: types.PREFIX
})
