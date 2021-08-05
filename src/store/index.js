import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import { enableMapSet } from 'immer'
import { uiReducer } from './ui'
import { globalSettingsReducer } from './globalSettings'
import { nagmeGlobalReducer } from './nagmeGlobalStore'
import { nagmeGlobalSagas } from './nagmeGlobalStore/saga'

import { membersReducer } from './memberStore'
import { memberSagas } from './memberStore/saga'

import { dashboardReducer } from '@components/Dashboard/ducks'
import { dashboardSagas } from '@components/Dashboard/ducks/saga'

import { leaderboardReducer } from '@components/LeaderBoards/ducks'
import { leaderboardSagas } from '@components/LeaderBoards/ducks/saga'

import { racesReducer } from '@components/WebRatings/ducks'
import { racesSagas } from '@components/WebRatings/ducks/saga'

import { statsPageReducer } from '@components/StatsPage/ducks'
import { statsSagas } from '@components/StatsPage/ducks/saga'

import { nagmePageReducer } from '@components/NagMePage/ducks'
import { nagmePageSagas } from '@components/NagMePage/ducks/saga'

import { entriesPageReducer } from '@components/EntriesPage/ducks'
import { entriesPageSagas } from '@components/EntriesPage/ducks/saga'

import { selectionsPageReducer } from '@components/SelectionsPage/ducks'
import { selectionsPageSagas } from '@components/SelectionsPage/ducks/saga'

import { historyPageReducer } from '@components/History/ducks'
import { historyPageSagas } from '@components/History/ducks/saga'
import { createBrowserHistory } from 'history'
import { connectRouter } from 'connected-react-router'

export const history = createBrowserHistory()

/* enable Set and Map in Immer produce function */
enableMapSet()

const configure = (initialState = {}) => {
  const reducer = (history) =>
    combineReducers({
      router: connectRouter(history),
      ui: uiReducer,
      globalSettings: globalSettingsReducer,
      races: racesReducer,
      leaderboard: leaderboardReducer,
      dashboard: dashboardReducer,
      nagmePage: nagmePageReducer,
      nagmeGlobal: nagmeGlobalReducer,
      history: historyPageReducer,
      stats: statsPageReducer,
      member: membersReducer,
      entries: entriesPageReducer,
      selections: selectionsPageReducer
    })

  function* rootSaga() {
    yield all([
      ...leaderboardSagas,
      ...racesSagas,
      ...historyPageSagas,
      ...dashboardSagas,
      ...nagmePageSagas,
      ...nagmeGlobalSagas,
      ...statsSagas,
      ...memberSagas,
      ...entriesPageSagas,
      ...selectionsPageSagas
    ])
  }

  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    reducer(history),
    initialState,
    compose(
      applyMiddleware(sagaMiddleware),
      process.env.NODE_ENV !== 'production' && window.devToolsExtension
        ? window.devToolsExtension()
        : (f) => f
    )
  )

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export const store = configure()
