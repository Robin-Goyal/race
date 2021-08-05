import { createActions } from 'redux-actions'

import types from './types'

const typesWithoutPrefix = Object.values(types).filter(i => i !== types.PREFIX)

export const {
  fetchData,
  fetchDataSuccess,
  fetchDataFailed,
  fetchNapHistory,
  fetchNapHistorySuccess,
  fetchNapHistoryFailed,
  updateNagmeInHistory
} = createActions({}, ...typesWithoutPrefix, { prefix: types.PREFIX })
