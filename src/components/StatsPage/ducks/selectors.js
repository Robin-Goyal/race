import { createSelector } from 'reselect'
import { isEmpty } from 'lodash'

const statsSelector = (state) => state.stats

export const getTableFilters = createSelector(statsSelector, (stats) =>
  stats.filters.filter((filter) => filter.is_table_filter)
)
export const getDataFilters = createSelector(statsSelector, (stats) =>
  stats.filters.filter((filter) => !filter.is_table_filter)
)
export const getCurrentMemberFilterSet = createSelector(
  statsSelector,
  (stats) => stats.currentMemberFilterSet
)
export const getCurrentFilterSet = createSelector(
  statsSelector,
  (stats) => stats.filtersets
)
export const getCurrentFilters = createSelector(statsSelector, (stats) => {
  if (
    !isEmpty(stats.currentFilters) &&
    !isEmpty(stats.currentMemberFilterSet)
  ) {
    return [...stats.currentMemberFilterSet, ...stats.currentFilters]
  }
  if (!isEmpty(stats.currentFilters)) {
    return stats.currentFilters
  } else if (!isEmpty(stats.currentMemberFilterSet)) {
    return stats.currentMemberFilterSet
  } else {
    return []
  }
})
