import { put, call, takeLatest, delay } from 'redux-saga/effects'
import types from './types'
import {
  fetchDataFailed,
  fetchDataSuccess,
  fetchRaceColumnsSuccess,
  fetchRaceColumnsFailed,
  fetchProfileDataSuccess,
  fetchProfileDataFailed,
  pollStart,
  pollStop,
  updateMemberSettingsFailed,
  updateMemberSettingsSuccess,
  updateProfileSubscriptionSuccess,
  updateProfileSubscriptionFailed
} from '@store/memberStore/actions'
import Api from '@utils/api'
import { apiUrls } from '@constants/api'
import {
  MEMBER_CHECK_STATUS_DELAY,
  MEMBER_FAIL_STATUS
} from '@constants/common'
import helpers from '@utils/helpers'
import Logger from '@utils/logger'

function* getMemberData() {
  try {
    const data = yield call(Api.get, apiUrls.member)
    yield put(fetchDataSuccess(data))
  } catch (err) {
    yield put(fetchDataFailed(err.message))
  }
}

function* fetchRaceColumns({ payload: { date } }) {
  try {
    const data = yield call(Api.get, apiUrls.memberRaceColumns(date))
    const result = helpers.transformMemberDataResponse(data)
    yield put(fetchRaceColumnsSuccess(result))
  } catch (err) {
    yield put(fetchRaceColumnsFailed(err.message))
  }
}

function* getProfileData({ payload: { name } }) {
  try {
    const data = yield call(Api.get, apiUrls.auth.profile(name))
    yield put(fetchProfileDataSuccess(data))
  } catch (err) {
    yield put(fetchProfileDataFailed(err.message))
  }
}

function* updateMemberSettings({ payload: { data, onSuccess, onError } }) {
  try {
    const response = yield call(
      Api.patch,
      apiUrls.auth.updateSettings(data.name),
      data.settings
    )
    yield put(updateMemberSettingsSuccess(response))
    onSuccess && onSuccess()
  } catch (err) {
    onError && onError()
    yield put(updateMemberSettingsFailed(err.message))
  }
}

function* updateProfileSubscription({ payload: { data, onSuccess, onError } }) {
  try {
    yield call(Api.put, apiUrls.auth.updateSubscription, data)
    yield put(updateProfileSubscriptionSuccess())
    onSuccess && onSuccess()
  } catch (err) {
    onError && onError()
    yield put(updateProfileSubscriptionFailed(err.message))
  }
}

function* pollSagaWorker() {
  while (true) {
    const response = yield call(Api.get, apiUrls.auth.checkSignIn)
    if (response && response.message === MEMBER_FAIL_STATUS) {
      yield put(pollStop())
      break
    }
    yield delay(MEMBER_CHECK_STATUS_DELAY)
  }
}

export function* saveSessionWorker() {
  try {
    yield call(Api.get, apiUrls.auth.saveSignIn)
    yield put(pollStart())
  } catch (err) {
    Logger.error(err)
  }
}
const withPrefix = (action) => `${types.PREFIX}/${action}`

export const memberSagas = [
  takeLatest(withPrefix(types.FETCH_DATA), getMemberData),
  takeLatest(withPrefix(types.FETCH_PROFILE_DATA), getProfileData),
  takeLatest(withPrefix(types.FETCH_RACE_COLUMNS), fetchRaceColumns),
  takeLatest(withPrefix(types.UPDATE_MEMBER_SETTINGS), updateMemberSettings),
  takeLatest(
    withPrefix(types.UPDATE_PROFILE_SUBSCRIPTION),
    updateProfileSubscription
  ),
  takeLatest(withPrefix(types.POLL_START), pollSagaWorker),
  takeLatest(withPrefix(types.SAVE_SESSION), saveSessionWorker)
]
