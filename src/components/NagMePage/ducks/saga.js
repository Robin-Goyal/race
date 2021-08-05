import { takeEvery, takeLatest, put, call } from 'redux-saga/effects'
import types from './types'
import {
  fetchDataSuccess,
  fetchDataFailed,
  deleteNagmeSuccess,
  deleteNagmeFailed,
  updateNagmeSuccess,
  updateNagmeFailed,
  createNagmeFailed,
  createNagmeSuccess
} from '@components/NagMePage/ducks/actions'
import Api from '@utils/api'
import { apiUrls } from '@constants/api'
import helpers from '@utils/helpers'

function* fetchNagMe({ payload: { page } }) {
  try {
    const data = yield call(Api.get, apiUrls.nagmes.get(page))
    const result = helpers.transformNagMesResponse(data)
    yield put(fetchDataSuccess(result))
  } catch (err) {
    yield put(fetchDataFailed(err.message))
  }
}

function* updateNagme({ payload: { data, onSuccess, onError } }) {
  try {
    const response = yield call(Api.put, apiUrls.nagmes.update(data.id), data)
    yield put(
      updateNagmeSuccess({
        nagme: response
      })
    )
    onSuccess && onSuccess(response)
  } catch (err) {
    yield put(updateNagmeFailed({ message: `Error occurred ${err}` }))
    onError && onError(err)
  }
}

function* deleteNagme({ payload: { data, onSuccess, onError } }) {
  try {
    yield call(Api.delete, apiUrls.nagmes.update(data.id))
    yield put(
      deleteNagmeSuccess({
        id: data.id
      })
    )
    onSuccess && onSuccess()
  } catch (err) {
    yield put(deleteNagmeFailed({ message: `Error occurred ${err}` }))
    onError && onError(err)
  }
}

function* createNagme({ payload: { data, onSuccess, onError } }) {
  try {
    const response = yield call(Api.post, apiUrls.nagmes.create, data)
    yield put(createNagmeSuccess(response))
    onSuccess && onSuccess(response)
  } catch (err) {
    yield put(createNagmeFailed({ message: err }))
    onError && onError(err)
  }
}

const withPrefix = (action) => `${types.PREFIX}/${action}`

export const nagmePageSagas = [
  takeEvery(withPrefix(types.FETCH_DATA), fetchNagMe),
  takeLatest(withPrefix(types.UPDATE_NAGME), updateNagme),
  takeLatest(withPrefix(types.DELETE_NAGME), deleteNagme),
  takeLatest(withPrefix(types.CREATE_NAGME), createNagme)
]
