import { createActions } from 'redux-actions'

import types from './types'

const typesWithoutPrefix = Object.values(types).filter(
  (i) => i !== types.PREFIX
)

export const {
  fetchLatestNapSelectionData,
  fetchLatestNapSelectionDataSuccess,
  fetchLatestNapSelectionDataFailed
} = createActions({}, ...typesWithoutPrefix, { prefix: types.PREFIX })
