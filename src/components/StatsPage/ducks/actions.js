import { createActions } from 'redux-actions'

import types from './types'

const typesWithoutPrefix = Object.values(types).filter(
  (i) => i !== types.PREFIX
)

export const {
  fetchUserFilter,
  fetchUserFilterSuccess,
  fetchUserFilterFailed,
  resetUserFilter,
  updateFilterSet,
  updateSorting,
  fetchConfig,
  fetchConfigSuccess,
  fetchConfigFailed,
  addFilter,
  updateFilter,
  deleteFilter,
  deleteFilterSet,
  deleteStat,
  deleteStatSuccess,
  deleteStatFailed,
  addStat,
  addStatSuccess,
  addStatFailed,
  fetchStats,
  fetchStatsSuccess,
  fetchStatsFailed,
  fetchChartData,
  fetchChartDataSuccess,
  fetchChartDataFailed,
  resetShowChart,
  downloadSelections
} = createActions({}, ...typesWithoutPrefix, { prefix: types.PREFIX })
