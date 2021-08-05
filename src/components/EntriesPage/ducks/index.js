import { handleActions } from 'redux-actions'
import produce from 'immer'

import types from './types'

const initialState = {
  loading: false,
  errors: {},
  data: [],
  previous: null,
  next: null,
  count: 0,
  totalPages: 1
}

const reducer = {
  [types.FETCH_DATA]: (state) =>
    produce(state, (draft) => {
      draft.loading = true
    }),
  [types.FETCH_DATA_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false
      draft.data = payload.data
      draft.previous = payload.previous
      draft.next = payload.next
      draft.count = payload.count
      draft.totalPages = payload.total_pages
    }),
  [types.FETCH_DATA_FAILED]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false
      draft.errors = payload
    })
}

export const entriesPageReducer = handleActions(reducer, initialState, {
  prefix: types.PREFIX
})
