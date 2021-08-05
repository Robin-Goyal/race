import { handleActions } from 'redux-actions'
import produce from 'immer'

import types from './types'

const initialState = {
  loading: false,
  errors: {},
  data: [],
  nagsMaxNum: 0,
  numNagMes: 0,
  previous: null,
  next: null,
  count: 0,
  totalPages: 1,
  noteMaxLength: 200
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
      draft.nagsMaxNum = payload.nagsMaxNum
      draft.numNagMes = payload.numNagMes
      draft.previous = payload.previous
      draft.next = payload.next
      draft.count = payload.count
      draft.totalPages = payload.total_pages
      draft.noteMaxLength = payload.noteMaxLength
    }),
  [types.FETCH_DATA_FAILED]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false
      draft.errors = payload
    }),
  [types.CREATE_NAGME_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.data.unshift(payload)
      draft.numNagMes = state.numNagMes + 1
    }),
  [types.DELETE_NAGME_SUCCESS]: (state, { payload: { id } }) =>
    produce(state, (draft) => {
      draft.data.splice(
        draft.data.findIndex((nagme) => nagme.id === id),
        1
      )
      draft.numNagMes = state.numNagMes > 0 ? state.numNagMes - 1 : 0
    }),
  [types.UPDATE_NAGME_SUCCESS]: (state, { payload: { nagme } }) =>
    produce(state, (draft) => {
      draft.data[draft.data.findIndex((item) => item.id === nagme.id)] = {
        ...nagme
      }
    })
}

export const nagmePageReducer = handleActions(reducer, initialState, {
  prefix: types.PREFIX
})
