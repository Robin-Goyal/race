import { takeLatest, put, call } from 'redux-saga/effects'
import types from './types'
import {
  fetchLatestNapSelectionDataFailed,
  fetchLatestNapSelectionDataSuccess
} from '@components/Dashboard/ducks/actions'
import Api from '@utils/api'
import { apiUrls } from '@constants/api'

/* Fetching all course races */
function* fetchLatestNapSelectionData() {
  try {
    const data = yield call(Api.get, apiUrls.dashboard.get)
    yield put(fetchLatestNapSelectionDataSuccess(data))
  } catch (err) {
    yield put(fetchLatestNapSelectionDataFailed(err.message))
  }
}

const withPrefix = (action) => `${types.PREFIX}/${action}`

export const dashboardSagas = [
  takeLatest(
    withPrefix(types.FETCH_LATEST_NAP_SELECTION_DATA),
    fetchLatestNapSelectionData
  )
]
