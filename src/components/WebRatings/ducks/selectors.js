import { createSelector } from 'reselect'
import isNil from 'lodash/isNil'

const getRacesData = (state) => state.races

export const getStatsMod = createSelector(
  getRacesData,
  (racesData) => racesData.selectedWp
)

export const getSelectedRows = createSelector(getRacesData, (racesData) => {
  if (racesData.selection && racesData.selection.runs) {
    return racesData.selection.runs
  }
  return []
})

export const getEntries = createSelector(getRacesData, (racesData) => {
  const entries = []
  if (racesData.entry) {
    Object.keys(racesData.entry).map((key) => {
      if (
        (key === 'nap' || key === 'nb' || key === 'reserve') &&
        racesData.entry[key] !== null
      ) {
        entries.push({
          value: key,
          id: racesData.entry[key],
          start_time: racesData.entry[`${key}_time`] || '',
          rtr_rank: racesData.entry[`${key}_rtr_rank`] || '',
          horse_name: racesData.entry[`${key}_horse_name`] || '',
          horse_nationality: racesData.entry[`${key}_horse_nationality`] || '',
          formatted_time: racesData.entry[`${key}_formatted_time`] || '',
          course_name: racesData.entry[`${key}_course_name`] || ''
        })
      }
    })
  }
  return entries
})

export const getDetailInfo = createSelector(getRacesData, (racesData) => {
  if (isNil(racesData.selectionsDetailInfo)) {
    return []
  }
  return racesData.selectionsDetailInfo.selected_runs
    ? racesData.selectionsDetailInfo.selected_runs.map((data) => data.run)
    : []
})
