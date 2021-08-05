import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import {
  updateFreezeHorseName,
  updateTableSettings,
  updateSynchroniseScrollbar
} from '@store/memberStore/actions'
import useMemberStore from '@utils/customHook/useMembersStore'

const useRaceTableSettings = () => {
  const dispatch = useDispatch()

  const { memberStorage, changeMemberSettings } = useMemberStore()

  const handleColumnsSettingsChange = useCallback(
    (data, onSuccess, onError) => {
      const hiddenColumns = memberStorage.allColumns
        .filter(
          (elem) =>
            !data.find(({ value }) => elem.value === value) && elem.value
        )
        .map((el) => el.defaultValue)
      dispatch(
        updateTableSettings({
          data,
          onSuccess,
          onError
        })
      )
      changeMemberSettings('hidden_race_columns', hiddenColumns)
    },
    [dispatch, memberStorage.activeColumns, memberStorage.profile]
  )
  const handleMemberSettingsChange = useCallback(
    (data) => {
      changeMemberSettings(data, !memberStorage.settings[data])
    },
    [dispatch, memberStorage.settings, memberStorage.profile]
  )
  const handleFreezeHorseNameChange = useCallback(() => {
    dispatch(updateFreezeHorseName())
    changeMemberSettings(
      'freeze_horse_name',
      !memberStorage.settings.freeze_horse_name
    )
  }, [dispatch, memberStorage.horseNameFreeze, memberStorage.profile])

  const handleSynchroniseScrollbar = useCallback(() => {
    dispatch(updateSynchroniseScrollbar())
  }, [dispatch, memberStorage.synchroniseScrollbar])

  return {
    isLoading: memberStorage.isLoading,
    columnSettingsData: memberStorage.activeColumns,
    handleColumnsSettingsChange,
    handleFreezeHorseNameChange,
    handleSynchroniseScrollbar,
    handleMemberSettingsChange
  }
}

export default useRaceTableSettings
