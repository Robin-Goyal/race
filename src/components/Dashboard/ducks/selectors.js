import { createSelector } from 'reselect'
import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'
import cloneDeepWith from 'lodash/cloneDeepWith'

const getDashboardData = (state) => state.dashboard

export const getNapData = createSelector(getDashboardData, (dashboardData) => {
  if (
    isNil(dashboardData.latestNapSelection) ||
    isEmpty(dashboardData.latestNapSelection) ||
    !dashboardData.latestNapSelection.entries ||
    (dashboardData.latestNapSelection.entries &&
      !dashboardData.latestNapSelection.entries[0]) ||
    (dashboardData.latestNapSelection.entries &&
      dashboardData.latestNapSelection.entries[0] &&
      !dashboardData.latestNapSelection.entries[0].data)
  ) {
    return []
  } else {
    return [
      {
        id: 'NAP',
        horseName:
          dashboardData.latestNapSelection.entries[0].data.NAP.horse_name,
        horseURL: dashboardData.latestNapSelection.entries[0].data.NAP.horse_url.replace(
          '/api',
          ''
        ),
        timeCourse: dashboardData.latestNapSelection.entries[0].data.NAP.course,
        courseSlug:
          dashboardData.latestNapSelection.entries[0].data.NAP.course_slug,
        startTime:
          dashboardData.latestNapSelection.entries[0].data.NB.start_time,
        tookXSP: dashboardData.latestNapSelection.entries[0].data.NAP.took_xsp,
        priceSelected:
          dashboardData.latestNapSelection.entries[0].data.NAP
            .price_when_selected,
        latestPrice:
          dashboardData.latestNapSelection.entries[0].data.NAP.latest_price,
        result: dashboardData.latestNapSelection.entries[0].data.NAP.result,
        oddsTaken:
          dashboardData.latestNapSelection.entries[0].data.NAP.odds_taken,
        profitloss:
          dashboardData.latestNapSelection.entries[0].data.NAP.profit_and_loss,
        data: dashboardData.latestNapSelection.entries[0].data.NAP
      },
      {
        id: 'NB',
        horseName:
          dashboardData.latestNapSelection.entries[0].data.NB.horse_name,
        horseURL: dashboardData.latestNapSelection.entries[0].data.NB.horse_url.replace(
          '/api',
          ''
        ),
        timeCourse: dashboardData.latestNapSelection.entries[0].data.NB.course,
        courseSlug:
          dashboardData.latestNapSelection.entries[0].data.NB.course_slug,
        startTime:
          dashboardData.latestNapSelection.entries[0].data.NB.start_time,
        tookXSP: dashboardData.latestNapSelection.entries[0].data.NB.took_xsp,
        priceSelected:
          dashboardData.latestNapSelection.entries[0].data.NB
            .price_when_selected,
        latestPrice:
          dashboardData.latestNapSelection.entries[0].data.NB.latest_price,
        result: dashboardData.latestNapSelection.entries[0].data.NB.result,
        oddsTaken:
          dashboardData.latestNapSelection.entries[0].data.NB.odds_taken,
        profitloss:
          dashboardData.latestNapSelection.entries[0].data.NB.profit_and_loss,
        data: dashboardData.latestNapSelection.entries[0].data.NB
      },
      {
        id: '3B',
        horseName:
          dashboardData.latestNapSelection.entries[0].data['3B'].horse_name,
        horseURL: dashboardData.latestNapSelection.entries[0].data[
          '3B'
        ].horse_url.replace('/api', ''),
        timeCourse:
          dashboardData.latestNapSelection.entries[0].data['3B'].course,
        courseSlug:
          dashboardData.latestNapSelection.entries[0].data['3B'].course_slug,
        startTime:
          dashboardData.latestNapSelection.entries[0].data['3B'].start_time,
        tookXSP:
          dashboardData.latestNapSelection.entries[0].data['3B'].took_xsp,
        priceSelected:
          dashboardData.latestNapSelection.entries[0].data['3B']
            .price_when_selected,
        latestPrice:
          dashboardData.latestNapSelection.entries[0].data['3B'].latest_price,
        result: dashboardData.latestNapSelection.entries[0].data['3B'].result,
        oddsTaken:
          dashboardData.latestNapSelection.entries[0].data['3B'].odds_taken,
        profitloss:
          dashboardData.latestNapSelection.entries[0].data['3B']
            .profit_and_loss,
        data: dashboardData.latestNapSelection.entries[0].data['3B']
      }
    ]
  }
})

export const getSelectionData = createSelector(
  getDashboardData,
  (dashboardData) => {
    if (
      isNil(dashboardData.latestNapSelection) ||
      isEmpty(dashboardData.latestNapSelection) ||
      !dashboardData.latestNapSelection.selections ||
      (dashboardData.latestNapSelection.selections &&
        !dashboardData.latestNapSelection.selections[0]) ||
      (dashboardData.latestNapSelection.selections &&
        dashboardData.latestNapSelection.selections[0] &&
        !dashboardData.latestNapSelection.selections[0].runs)
    ) {
      return []
    } else {
      const runs = cloneDeepWith(
        dashboardData.latestNapSelection.selections[0].runs
      )
      const moreData = [
        {
          course_name: 'Profit & Loss / Number of Winners',
          horse: null,
          start_time: null,
          isp: dashboardData.latestNapSelection.selections[0].roi_isp.toFixed(
            2
          ),
          price_when_selected: dashboardData.latestNapSelection.selections[0].roi_price_taken.toFixed(
            2
          ),
          result:
            dashboardData.latestNapSelection.selections[0].number_of_winners,
          xsp: dashboardData.latestNapSelection.selections[0].roi_bfsp.toFixed(
            2
          )
        },
        {
          course_name: 'Return on Investment / Strike Rate',
          horse: null,
          start_time: null,
          isp: `${dashboardData.latestNapSelection.selections[0].roi_isp_percentage.toFixed(
            2
          )}%`,
          price_when_selected: `${dashboardData.latestNapSelection.selections[0].roi_price_taken_percentage.toFixed(
            2
          )}%`,
          result: `${dashboardData.latestNapSelection.selections[0].strike_rate.toFixed(
            2
          )}%`,
          xsp: `${dashboardData.latestNapSelection.selections[0].roi_bfsp_percentage.toFixed(
            2
          )}%`
        }
      ]
      return [...runs, ...moreData]
    }
  }
)
