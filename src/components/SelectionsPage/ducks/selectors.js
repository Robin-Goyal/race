import { createSelector } from 'reselect'
import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'
import cloneDeepWith from 'lodash/cloneDeepWith'

const getSelectionsData = (state) => state.selections

export const getSelectionData = createSelector(
  getSelectionsData,
  (selectionsData) => {
    if (isNil(selectionsData.data) || isEmpty(selectionsData.data)) {
      return []
    } else {
      return selectionsData.data.map((selection) => {
        const shallowSelection = { ...selection }
        const runs = cloneDeepWith(shallowSelection.runs)
        const moreData = [
          {
            course_name: 'Profit & Loss / Number of Winners',
            horse: null,
            start_time: null,
            isp: shallowSelection.roi_isp.toFixed(2),
            price_when_selected: shallowSelection.roi_price_taken.toFixed(2),
            result: shallowSelection.number_of_winners,
            xsp: shallowSelection.roi_bfsp.toFixed(2)
          },
          {
            course_name: 'Return on Investment / Strike Rate',
            horse: null,
            start_time: null,
            isp: `${shallowSelection.roi_isp_percentage.toFixed(2)}%`,
            price_when_selected: `${shallowSelection.roi_price_taken_percentage.toFixed(
              2
            )}%`,
            result: `${shallowSelection.strike_rate.toFixed(2)}%`,
            xsp: `${shallowSelection.roi_bfsp_percentage.toFixed(2)}%`
          }
        ]
        shallowSelection.completeRuns = [...runs, ...moreData]
        return shallowSelection
      })
    }
  }
)
