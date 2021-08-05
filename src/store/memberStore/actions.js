import { createActions } from 'redux-actions'

import types from './types'

const typesWithoutPrefix = Object.values(types).filter(
  (i) => i !== types.PREFIX
)

export const {
  fetchData,
  fetchDataSuccess,
  fetchDataFailed,
  fetchProfileData,
  fetchProfileDataSuccess,
  fetchProfileDataFailed,
  fetchRaceColumns,
  fetchRaceColumnsSuccess,
  fetchRaceColumnsFailed,
  updateTableSettings,
  updateTableSettingsSuccess,
  updateTableSettingsFailed,
  updateMemberSettings,
  updateMemberSettingsSuccess,
  updateMemberSettingsFailed,
  updateProfileSubscription,
  updateProfileSubscriptionSuccess,
  updateProfileSubscriptionFailed,
  updateFreezeHorseName,
  updateSynchroniseScrollbar,
  pollStart,
  pollStop,
  saveSession
} = createActions({}, ...typesWithoutPrefix, {
  prefix: types.PREFIX
})
