import { takeEvery, put } from 'redux-saga/effects'
import types from './types'
import { fetchDataFailed, fetchDataSuccess } from '@store/memberStore/actions'

function* fetchRaceData({ payload }) {
  try {
    // const data = yield call(Api.get, payload)
    yield put(fetchDataSuccess({ activeColumns: payload }))
  } catch (err) {
    yield put(fetchDataFailed(err.message))
  }
}

const withPrefix = (action) => `${types.PREFIX}/${action}`

export const nagmeGlobalSagas = [
  takeEvery(withPrefix(types.FETCH_DATA), fetchRaceData)
]
