import { useDispatch, useSelector } from 'react-redux'
import { fetchNapData } from '@components/LeaderBoards/ducks/actions'
import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'

const useLeaderboardStore = () => {
  const dispatch = useDispatch()
  const leaderboardStore = useSelector((store) => store.leaderboard)

  const fetchNapDetails = (profileID, onSuccess, onError) => {
    dispatch(
      fetchNapData({
        profileID,
        onSuccess,
        onError
      })
    )
  }

  const getDetailInfo = (hasEntered, isAdminUser) => {
    if (
      isNil(leaderboardStore.napsDetailInfo) ||
      isEmpty(leaderboardStore.napsDetailInfo) ||
      (leaderboardStore.napsDetailInfo.body &&
        !leaderboardStore.napsDetailInfo.body.entry) ||
      (leaderboardStore.napsDetailInfo.body &&
        leaderboardStore.napsDetailInfo.body.entry &&
        !leaderboardStore.napsDetailInfo.body.entry.data)
    ) {
      return []
    } else {
      const data = []
      if (
        hasEntered ||
        isAdminUser ||
        leaderboardStore.napsDetailInfo.body.entry.data.NAP.is_completed
      ) {
        data.push({
          id: 'NAP',
          horseName:
            leaderboardStore.napsDetailInfo.body.entry.data.NAP.horse_name,
          timeCourse:
            leaderboardStore.napsDetailInfo.body.entry.data.NAP.course,
          tookXSP:
            leaderboardStore.napsDetailInfo.body.entry.data.NAP.took_xsp ||
            false,
          priceSelected:
            leaderboardStore.napsDetailInfo.body.entry.data.NAP
              .price_when_selected,
          latestPrice:
            leaderboardStore.napsDetailInfo.body.entry.data.NAP.latest_price,
          result: leaderboardStore.napsDetailInfo.body.entry.data.NAP.result,
          oddsTaken:
            leaderboardStore.napsDetailInfo.body.entry.data.NAP.odds_taken,
          profitloss:
            leaderboardStore.napsDetailInfo.body.entry.data.NAP.profit_and_loss,
          data: leaderboardStore.napsDetailInfo.body.entry.data.NAP
        })
      }
      if (
        hasEntered ||
        isAdminUser ||
        leaderboardStore.napsDetailInfo.body.entry.data.NB.is_completed
      ) {
        data.push({
          id: 'NB',
          horseName:
            leaderboardStore.napsDetailInfo.body.entry.data.NB.horse_name,
          timeCourse: leaderboardStore.napsDetailInfo.body.entry.data.NB.course,
          tookXSP:
            leaderboardStore.napsDetailInfo.body.entry.data.NB.took_xsp ||
            false,
          priceSelected:
            leaderboardStore.napsDetailInfo.body.entry.data.NB
              .price_when_selected,
          latestPrice:
            leaderboardStore.napsDetailInfo.body.entry.data.NB.latest_price,
          result: leaderboardStore.napsDetailInfo.body.entry.data.NB.result,
          oddsTaken:
            leaderboardStore.napsDetailInfo.body.entry.data.NB.odds_taken,
          profitloss:
            leaderboardStore.napsDetailInfo.body.entry.data.NB.profit_and_loss,
          data: leaderboardStore.napsDetailInfo.body.entry.data.NB
        })
      }
      if (
        hasEntered ||
        isAdminUser ||
        leaderboardStore.napsDetailInfo.body.entry.data['3B'].is_completed
      ) {
        data.push({
          id: '3B',
          horseName:
            leaderboardStore.napsDetailInfo.body.entry.data['3B'].horse_name,
          timeCourse:
            leaderboardStore.napsDetailInfo.body.entry.data['3B'].course,
          tookXSP:
            leaderboardStore.napsDetailInfo.body.entry.data['3B'].took_xsp ||
            false,
          priceSelected:
            leaderboardStore.napsDetailInfo.body.entry.data['3B']
              .price_when_selected,
          latestPrice:
            leaderboardStore.napsDetailInfo.body.entry.data['3B'].latest_price,
          result: leaderboardStore.napsDetailInfo.body.entry.data['3B'].result,
          oddsTaken:
            leaderboardStore.napsDetailInfo.body.entry.data['3B'].odds_taken,
          profitloss:
            leaderboardStore.napsDetailInfo.body.entry.data['3B']
              .profit_and_loss,
          data: leaderboardStore.napsDetailInfo.body.entry.data['3B']
        })
      }
      return data
    }
  }

  const getNapsDetailInfo = () => leaderboardStore.napsDetailInfo

  const isAnyRaceCompleted = () => {
    if (
      isNil(leaderboardStore.napsDetailInfo) ||
      isEmpty(leaderboardStore.napsDetailInfo) ||
      (leaderboardStore.napsDetailInfo.body &&
        !leaderboardStore.napsDetailInfo.body.entry) ||
      (leaderboardStore.napsDetailInfo.body &&
        leaderboardStore.napsDetailInfo.body.entry &&
        !leaderboardStore.napsDetailInfo.body.entry.data)
    ) {
      return false
    }
    return (
      leaderboardStore.napsDetailInfo.body.entry.data.NAP.is_completed ||
      leaderboardStore.napsDetailInfo.body.entry.data.NB.is_completed ||
      leaderboardStore.napsDetailInfo.body.entry.data['3B'].is_completed
    )
  }

  return {
    fetchNapDetails,
    getDetailInfo,
    getNapsDetailInfo,
    isAnyRaceCompleted
  }
}

export default useLeaderboardStore
