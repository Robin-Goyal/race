import { takeLatest, put, call } from 'redux-saga/effects'
import types from './types'
import {
  fetchDataFailed,
  fetchDataSuccess,
  fetchNapDataSuccess,
  fetchNapDataFailed
} from '@components/LeaderBoards/ducks/actions'
import Api from '@utils/api'
import { apiUrls } from '@constants/api'
import helpers from '@utils/helpers'

function* fetchLeaderboardData({ payload }) {
  try {
    const data = yield call(
      Api.get,
      apiUrls.leaderBoards(payload.date, payload.detail, payload.extra)[
        payload.type
      ],
      {
        params: {
          column: payload.column || null,
          dir: payload.dir || null,
          page: payload.page || null,
          dashboard: payload.dashboard || null,
          data: payload.data || null
        }
      }
    )
    const result = helpers.transformLeaderBoardResponse(data)
    yield put(fetchDataSuccess(result))
  } catch (err) {
    yield put(fetchDataFailed(err.message))
  }
}

function* fetchNapData({ payload: { profileID, onSuccess, onError } }) {
  try {
    const data = yield call(Api.get, apiUrls.entry.entryTodayTip(profileID))
    yield put(fetchNapDataSuccess(data))
    onSuccess && onSuccess()
  } catch (err) {
    yield put(fetchNapDataFailed(err.message))
    onError && onError(err)
  }
}

const withPrefix = (action) => `${types.PREFIX}/${action}`

export const leaderboardSagas = [
  takeLatest(withPrefix(types.FETCH_DATA), fetchLeaderboardData),
  takeLatest(withPrefix(types.FETCH_NAP_DATA), fetchNapData)
]
