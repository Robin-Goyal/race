import { handleActions } from 'redux-actions'
import produce from 'immer'
import types from './types'

const initialState = {
  isLoading: false,
  data: [],
  name: '',
  page_info: {},
  napInfo: {},
  errors: {}
}

const reducer = {
  [types.FETCH_DATA]: (state) =>
    produce(state, (draft) => {
      draft.isLoading = true
      draft.data = []
      draft.name = ''
    }),
  [types.FETCH_DATA_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.isLoading = false
      draft.data = payload.runs
      draft.name = payload.name
      draft.page_info = payload.page_info
    }),
  [types.FETCH_DATA_FAILED]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.isLoading = false
      draft.errors = payload
    }),
  [types.FETCH_NAP_HISTORY]: (state) =>
    produce(state, (draft) => {
      draft.isLoading = true
      draft.napInfo = {}
    }),
  [types.FETCH_NAP_HISTORY_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.isLoading = false
      draft.napInfo = payload.nap_info
    }),
  [types.FETCH_NAP_HISTORY_FAILED]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.isLoading = false
      draft.errors = payload
    }),
  [types.UPDATE_NAGME_IN_HISTORY]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.data = state.data.map((run) => {
        const shallowRun = { ...run }
        if (run.horse.id === payload.data.horse.id) {
          return {
            ...shallowRun,
            nag_me: {
              auto_delete: payload.data.auto_delete,
              horse_id: payload.data.horse.id,
              id: payload.data.id,
              note: payload.data.note
            }
          }
        }
        return shallowRun
      })
    })
}

export const historyPageReducer = handleActions(reducer, initialState, {
  prefix: types.PREFIX
})
