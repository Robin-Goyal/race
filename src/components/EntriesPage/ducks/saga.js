import { takeEvery, put, call } from 'redux-saga/effects'
import types from './types'
import {
  fetchDataSuccess,
  fetchDataFailed
} from '@components/EntriesPage/ducks/actions'
import Api from '@utils/api'
import { apiUrls } from '@constants/api'
import helpers from '@utils/helpers'

function* fetchData({ payload }) {
  try {
    const data = yield call(
      Api.get,
      apiUrls.entry.getEntries(payload.username, payload.page)
    )
    const result = helpers.transformNagMesResponse(data)
    yield put(fetchDataSuccess(result))
  } catch (err) {
    yield put(fetchDataFailed(err.message))
  }
}

const withPrefix = (action) => `${types.PREFIX}/${action}`

export const entriesPageSagas = [
  takeEvery(withPrefix(types.FETCH_DATA), fetchData)
]
