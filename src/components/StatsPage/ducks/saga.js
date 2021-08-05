import { takeLatest, put, call } from 'redux-saga/effects'
import types from './types'
import {
  deleteStatSuccess,
  deleteStatFailed,
  addStatSuccess,
  addStatFailed,
  fetchUserFilterSuccess,
  fetchUserFilterFailed,
  fetchConfigSuccess,
  fetchConfigFailed,
  fetchStatsSuccess,
  fetchStatsFailed
} from './actions'
import { apiUrls } from '@constants/api'
import Api from '@utils/api'
import Logger from '@utils/logger'
import {
  fetchChartDataFailed,
  fetchChartDataSuccess
} from '@components/StatsPage/ducks/actions'
import helpers from '@utils/helpers'
import FileSaver from 'file-saver'
// import { config } from '@components/StatsPage/data/configMock'

function* fetchStatsConfigs({ payload: { onSuccess, onError } }) {
  try {
    const data = yield call(Api.get, apiUrls.stats.config)
    if (data) {
      const filters = helpers.transformStatsFilter(data.filters)
      yield put(
        fetchConfigSuccess({
          filters: filters,
          group_bys: data.group_bys,
          user_filters: data.user_filters
        })
      )
      onSuccess && onSuccess(data.group_bys)
    } else {
      const err = new Error(
        'Oops, something went wrong. Please contact to administrator'
      )
      onError && onError(err)
    }
  } catch (err) {
    Logger.log(err)
    onError && onError(err)
    yield put(fetchConfigFailed(err.message))
  }
}

function* fetchStatsData({ payload }) {
  try {
    const data = yield call(
      Api.post,
      apiUrls.stats.statsData(
        payload.statsType,
        payload.groupBy,
        payload.filterBy
      ),
      payload.body
    )
    yield put(fetchStatsSuccess({ ...data, filterBy: payload.filterBy }))
  } catch (err) {
    yield put(fetchStatsFailed(err.message))
  }
}

function* fetchUserFilter({ payload }) {
  try {
    if (payload === 'Default') {
      yield put(
        fetchUserFilterSuccess({
          currentFilterName: payload,
          filters: [
            { name: 'rtr-rank', values: [{ value: '1|1', label: '1 - 1' }] }
          ]
        })
      )
    } else {
      const data = yield call(Api.get, apiUrls.stats.userFilter(payload))
      yield put(
        fetchUserFilterSuccess({
          currentFilterName: payload,
          filters: data.filters
        })
      )
    }
  } catch (err) {
    yield put(fetchUserFilterFailed(err.message))
  }
}

function* deleteStat({ payload: { data, onSuccess, onError } }) {
  try {
    yield call(Api.delete, apiUrls.stats.userFilter(data.name))
    yield put(
      deleteStatSuccess({
        name: data.name,
        type: data.type
      })
    )
    onSuccess && onSuccess()
  } catch (err) {
    yield put(deleteStatFailed({ message: `Error occurred ${err}` }))
    onError && onError(err)
  }
}

function* addStat({ payload: { data, onSuccess, onError } }) {
  try {
    yield call(Api.post, apiUrls.stats.createUserFilter, data)
    yield put(
      addStatSuccess({
        name: data.name,
        filters: data.filters
      })
    )
    onSuccess && onSuccess()
  } catch (err) {
    yield put(addStatFailed({ message: `Error occurred ${err}` }))
    onError && onError(err)
  }
}

function* fetchChartDataWorker({ payload: { key, type, onError } }) {
  try {
    const response = yield call(Api.get, apiUrls.stats.chartUrl(key, type))
    // const result = helpers.transformChartResponse(response)
    let series = []
    if (response && response.series && response.series.length > 1) {
      series = response.series[2]
    }
    yield put(fetchChartDataSuccess({ series }))
  } catch (err) {
    onError && onError(err)
    yield put(fetchChartDataFailed(err.message))
  }
}

/* download a file for dashboard page */
function* downloadSelections({
  payload: { url, dateFormat, onSuccess, onError }
}) {
  try {
    const fileName = `rtr_filtersets_results_${dateFormat}.csv`
    const data = yield call(Api.get, url, { responseType: 'arraybuffer' })
    if (data) {
      const blob = new Blob([data], { type: 'text/csv' })
      FileSaver.saveAs(blob, fileName)
      onSuccess && onSuccess()
    } else {
      const err = new Error(
        'Oops, something went wrong. Please contact to administrator'
      )
      onError && onError(err)
    }
  } catch (err) {
    onError && onError(err)
  }
}

const withPrefix = (action) => `${types.PREFIX}/${action}`

export const statsSagas = [
  takeLatest(withPrefix(types.FETCH_CONFIG), fetchStatsConfigs),
  takeLatest(withPrefix(types.FETCH_USER_FILTER), fetchUserFilter),
  takeLatest(withPrefix(types.FETCH_STATS), fetchStatsData),
  takeLatest(withPrefix(types.DELETE_STAT), deleteStat),
  takeLatest(withPrefix(types.ADD_STAT), addStat),
  takeLatest(withPrefix(types.FETCH_CHART_DATA), fetchChartDataWorker),
  takeLatest(withPrefix(types.DOWNLOAD_SELECTIONS), downloadSelections)
]
