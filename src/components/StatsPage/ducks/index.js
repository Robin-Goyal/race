import { handleActions } from 'redux-actions'
import produce from 'immer'
import types from './types'

const initialState = {
  loading: false,
  errors: {},
  can_convert_rows_to_filters: false,
  download_url: '',
  num_runs_download: 0,
  num_runs_today: 0,
  num_runs_tomorrow: 0,
  minimum_membership_to_filter: '',
  minimum_membership_to_view: {},
  currentFilters: [],
  currentMemberFilterSet: {},
  page: 1,
  num_pages: 1,
  dir: 'asc',
  column: 'title',
  filters: [],
  groupBys: [],
  filtersets: [],
  user_filters: ['Default'],
  rows: [],
  currentFilterName: '',
  showChart: false,
  chartData: null
}

const reducer = {
  [types.ADD_FILTER]: (state, { payload: filters }) =>
    produce(state, (draft) => {
      draft.num_pages = 1
      draft.currentFilterName = ''
      draft.currentFilters = filters
    }),

  [types.UPDATE_FILTER_SET]: (state, { payload: userFilters }) =>
    produce(state, (draft) => {
      draft.num_pages = 1
      draft.currentFilterName = ''
      draft.currentFilters = []
      draft.filtersets = userFilters
    }),

  [types.UPDATE_SORTING]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = true
      draft.showChart = false
      draft.dir = payload.dir
      draft.column = payload.column
    }),

  [types.DELETE_FILTER_SET]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.currentFilterName = ''
      draft.filtersets = state.filtersets.filter((f) => f !== payload.name)
    }),

  [types.DELETE_FILTER]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.currentFilterName = ''
      const idx = state.currentFilters.findIndex((f) => f.name === payload.name)
      if (state.currentFilters[idx].values.length > 1 && payload.value) {
        draft.currentFilters[idx].values = state.currentFilters[
          idx
        ].values.filter((val) => val.label !== payload.value.label)
      } else if (
        state.currentFilters[idx].values.length > 1 &&
        payload.values &&
        payload.values.length > 0
      ) {
        draft.currentFilters[idx].values = payload.values
      } else {
        draft.currentFilters = state.currentFilters.filter(
          (f) => f.name !== payload.name
        )
      }
    }),

  [types.FETCH_CONFIG]: (state) =>
    produce(state, (draft) => {
      draft.loading = true
      draft.showChart = false
    }),
  [types.FETCH_STATS]: (state) =>
    produce(state, (draft) => {
      draft.loading = true
      draft.showChart = false
    }),
  [types.FETCH_USER_FILTER]: (state) =>
    produce(state, (draft) => {
      draft.loading = true
      draft.showChart = false
    }),
  [types.FETCH_CHART_DATA]: (state) =>
    produce(state, (draft) => {
      draft.loading = true
      draft.showChart = false
    }),

  [types.FETCH_CONFIG_FAILED]: (state) =>
    produce(state, (draft) => {
      draft.loading = false
    }),
  [types.FETCH_STATS_FAILED]: (state) =>
    produce(state, (draft) => {
      draft.loading = false
    }),
  [types.FETCH_USER_FILTER_FAILED]: (state) =>
    produce(state, (draft) => {
      draft.loading = false
    }),

  [types.FETCH_CONFIG_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false
      draft.filters = payload.filters
      draft.groupBys = payload.group_bys
      if (payload.user_filters) {
        draft.user_filters = [...payload.user_filters, 'Default']
      }
    }),

  [types.FETCH_STATS_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false
      draft.num_pages = payload.num_pages
      draft.page = payload.page || 1
      draft.rows = payload.rows
      draft.num_runs_today = payload.num_runs_today
      draft.num_runs_tomorrow = payload.num_runs_tomorrow
      draft.minimum_membership_to_filter = payload.minimum_membership_to_filter
      draft.minimum_membership_to_view = payload.minimum_membership_to_view
      draft.can_convert_rows_to_filters = payload.can_convert_rows_to_filters
      draft.download_url = payload.download_url || ''
      draft.num_runs_download = payload.num_runs_download || 0
      if (!payload.filterBy) {
        draft.filtersets = []
      }
    }),
  [types.FETCH_USER_FILTER_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false
      draft.currentFilterName = payload.currentFilterName || ''
      draft.currentFilters = payload.filters || []
      draft.filtersets = []
    }),
  [types.DELETE_STAT_SUCCESS]: (state, { payload: { name, type } }) =>
    produce(state, (draft) => {
      draft.currentFilterName = 'Default'
      draft.user_filters.splice(
        draft.user_filters.findIndex((data) => data === name),
        1
      )
      if (type && type === 'prostats') {
        draft.currentFilters = [
          {
            name: 'rtr-rank',
            values: [
              {
                label: '1 - 1',
                value: '1|1'
              }
            ]
          }
        ]
      } else {
        draft.currentFilters = []
      }
    }),
  [types.DELETE_STAT_FAILED]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.error = payload
      draft.loading = false
    }),
  [types.ADD_STAT_SUCCESS]: (state, { payload: { name, filters } }) =>
    produce(state, (draft) => {
      draft.user_filters.push(name)
      draft.currentFilterName = name
      draft.currentFilters = filters
    }),
  [types.ADD_STAT_FAILED]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.error = payload
      draft.loading = false
    }),
  [types.RESET_USER_FILTER]: (state) =>
    produce(state, (draft) => {
      draft.currentFilterName = ''
      draft.currentMemberFilterSet = {}
      draft.showChart = false
    }),
  [types.RESET_SHOW_CHART]: (state) =>
    produce(state, (draft) => {
      draft.showChart = false
    }),
  [types.FETCH_CHART_DATA_SUCCESS]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.showChart = true
      draft.chartData = payload
      draft.loading = false
    }),
  [types.FETCH_CHART_DATA_FAILED]: (state, { payload }) =>
    produce(state, (draft) => {
      draft.error = payload
      draft.loading = false
    })
}

export const statsPageReducer = handleActions(reducer, initialState, {
  prefix: types.PREFIX
})
