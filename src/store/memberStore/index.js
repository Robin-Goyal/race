import { handleActions } from 'redux-actions'
import produce from 'immer'
import types from './types'
import { ALL_COLUMNS } from '@constants/tablesConfigs/racesSettings'
import { MEMBERHIPS } from '@constants/common'

const initialState = {
  isLoading: true,
  error: '',
  canSeeExtendedInfo: false,
  allColumns: ALL_COLUMNS,
  activeColumns: [],
  disabledColumns: [],
  profile: {
    membership: MEMBERHIPS['FREE'],
    user_id: 0,
    display_name: '',
    user_email: ''
  },
  hash_key: '',
  crisp_restore_hash: '',
  crisp_verify_hash: '',
  loggedIn: false,
  settings: {},
  memberProfile: {},
  horseNameFreeze: false,
  synchroniseScrollbar: false,
  showMemberCheckDialog: false,
  noteMaxLength: 200
}

const reducer = {
  [types.FETCH_DATA]: (state) =>
    produce(state, (draft) => {
      draft.isLoading = true
    }),
  [types.FETCH_DATA_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.profile = payload.profile
      draft.loggedIn = true
      draft.settings = payload.settings
      draft.hash_key = payload.hash_key
      draft.crisp_restore_hash = payload.crisp_restore_hash
      draft.crisp_verify_hash = payload.crisp_verify_hash
      draft.horseNameFreeze = payload.settings.freeze_horse_name || false
      draft.isLoading = false
    }),
  [types.FETCH_DATA_FAILED]: (state, payload) =>
    produce(state, (draft) => {
      draft.error = payload
      draft.isLoading = false
    }),
  [types.FETCH_PROFILE_DATA_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.memberProfile = payload
      draft.isLoading = false
    }),
  [types.FETCH_PROFILE_DATA_FAILED]: (state, payload) =>
    produce(state, (draft) => {
      draft.error = payload
      draft.isLoading = false
    }),

  [types.FETCH_RACE_COLUMNS]: (state) =>
    produce(state, (draft) => {
      draft.isLoading = true
    }),
  [types.FETCH_RACE_COLUMNS_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.allColumns = payload.allColumns
      draft.activeColumns = payload.activeColumns
      draft.disabledColumns = payload.disabledColumns
      draft.noteMaxLength = payload.max_note_length
      draft.canSeeExtendedInfo = payload.can_see_extended_info
      draft.isLoading = false
    }),
  [types.FETCH_RACE_COLUMNS_FAILED]: (state, payload) =>
    produce(state, (draft) => {
      draft.error = payload
      draft.isLoading = false
    }),

  [types.UPDATE_MEMBER_SETTINGS]: (state) =>
    produce(state, (draft) => {
      draft.isLoading = true
    }),
  [types.UPDATE_MEMBER_SETTINGS_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.isLoading = false
      draft.settings = { ...payload }
      draft.isLoading = false
    }),
  [types.UPDATE_MEMBER_SETTINGS_FAILED]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.isLoading = false
      draft.error = payload
    }),

  [types.UPDATE_PROFILE_SUBSCRIPTION]: (state) =>
    produce(state, (draft) => {
      draft.isLoading = true
    }),
  [types.UPDATE_PROFILE_SUBSCRIPTION_SUCCESS]: (state) =>
    produce(state, (draft) => {
      draft.isLoading = false
    }),
  [types.UPDATE_PROFILE_SUBSCRIPTION_FAILED]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.isLoading = false
      draft.error = payload
    }),

  [types.UPDATE_TABLE_SETTINGS]: (state, { payload: { data, onSuccess } }) =>
    produce(state, (draft) => {
      draft.activeColumns = data
      setTimeout(() => {
        onSuccess && onSuccess()
      }, 0)
    }),
  [types.UPDATE_FREEZE_HORSE_NAME]: (state) =>
    produce(state, (draft) => {
      draft.horseNameFreeze = !state.horseNameFreeze
    }),
  [types.UPDATE_SYNCHRONISE_SCROLLBAR]: (state) =>
    produce(state, (draft) => {
      draft.synchroniseScrollbar = !state.synchroniseScrollbar
    }),
  [types.POLL_STOP]: (state) =>
    produce(state, (draft) => {
      draft.showMemberCheckDialog = true
    }),
  [types.SAVE_SESSION]: (state) =>
    produce(state, (draft) => {
      draft.showMemberCheckDialog = false
    })
}

export const membersReducer = handleActions(reducer, initialState, {
  prefix: types.PREFIX
})
