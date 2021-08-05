import { createActions } from 'redux-actions'

import types from './types'

const typesWithoutPrefix = Object.values(types).filter(
  (i) => i !== types.PREFIX
)

export const {
  setItemData,
  resetItemData,
  createItem,
  createItemSuccess,
  createItemFailed,
  updateItem,
  updateItemSuccess,
  updateItemFailed
} = createActions({}, ...typesWithoutPrefix, {
  prefix: types.PREFIX
})
