import { createSelector } from 'reselect'
import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'

const getEntriesData = (state) => state.entries

export const getNapData = createSelector(getEntriesData, (entriesData) => {
  if (isNil(entriesData.data) || isEmpty(entriesData.data)) {
    return []
  } else {
    const entries = []
    entriesData.data.map((entry) => {
      if (entry.data) {
        entries.push({
          header_text_1: entry.data.header_text_1,
          header_text_2: entry.data.header_text_2,
          comment: entry.comment,
          total: entry.data.total,
          data: [
            {
              id: 'NAP',
              horseName: entry.data.NAP.horse_name,
              horseURL: entry.data.NAP.horse_url.replace('/api', ''),
              timeCourse: entry.data.NAP.course,
              courseSlug: entry.data.NAP.course_slug,
              startTime: entry.data.NB.start_time,
              tookXSP: entry.data.NAP.took_xsp,
              priceSelected: entry.data.NAP.price_when_selected,
              latestPrice: entry.data.NAP.latest_price,
              result: entry.data.NAP.result,
              oddsTaken: entry.data.NAP.odds_taken,
              profitloss: entry.data.NAP.profit_and_loss,
              data: entry.data.NAP
            },
            {
              id: 'NB',
              horseName: entry.data.NB.horse_name,
              horseURL: entry.data.NB.horse_url.replace('/api', ''),
              timeCourse: entry.data.NB.course,
              courseSlug: entry.data.NB.course_slug,
              startTime: entry.data.NB.start_time,
              tookXSP: entry.data.NB.took_xsp,
              priceSelected: entry.data.NB.price_when_selected,
              latestPrice: entry.data.NB.latest_price,
              result: entry.data.NB.result,
              oddsTaken: entry.data.NB.odds_taken,
              profitloss: entry.data.NB.profit_and_loss,
              data: entry.data.NB
            },
            {
              id: '3B',
              horseName: entry.data['3B'].horse_name,
              horseURL: entry.data['3B'].horse_url.replace('/api', ''),
              timeCourse: entry.data['3B'].course,
              courseSlug: entry.data['3B'].course_slug,
              startTime: entry.data['3B'].start_time,
              tookXSP: entry.data['3B'].took_xsp,
              priceSelected: entry.data['3B'].price_when_selected,
              latestPrice: entry.data['3B'].latest_price,
              result: entry.data['3B'].result,
              oddsTaken: entry.data['3B'].odds_taken,
              profitloss: entry.data['3B'].profit_and_loss,
              data: entry.data['3B']
            }
          ]
        })
      }
    })
    return entries
  }
})
