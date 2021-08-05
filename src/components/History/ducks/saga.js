import { takeEvery, takeLatest, put, call } from 'redux-saga/effects'
import types from './types'
import {
  fetchDataFailed,
  fetchDataSuccess,
  fetchNapHistorySuccess,
  fetchNapHistoryFailed
} from '@components/History/ducks/actions'
import Api from '@utils/api'
import { apiUrls } from '@constants/api'
import helpers from '@utils/helpers'

function* fetchHistoryData({ payload }) {
  try {
    const data = yield call(Api.get, apiUrls.history[payload.type](payload))
    const result = helpers.transformHistoryResponse(data)
    yield put(fetchDataSuccess(result))
  } catch (err) {
    yield put(fetchDataFailed(err.message))
  }
}

function* fetchNapHistory() {
  try {
    const data = yield call(Api.get, apiUrls.history.napHistory)
    yield put(fetchNapHistorySuccess(data))
  } catch (err) {
    yield put(fetchNapHistoryFailed(err.message))
  }
}

const withPrefix = (action) => `${types.PREFIX}/${action}`

export const historyPageSagas = [
  takeEvery(withPrefix(types.FETCH_DATA), fetchHistoryData),
  takeLatest(withPrefix(types.FETCH_NAP_HISTORY), fetchNapHistory)
]
