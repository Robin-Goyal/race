import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import {
  fetchData,
  fetchRaceColumns,
  updateMemberSettings,
  fetchProfileData,
  updateProfileSubscription
} from '@store/memberStore/actions'
import { toast } from 'react-toastify'

const useMemberStore = () => {
  const dispatch = useDispatch()

  const memberStorage = useSelector((store) => store.member)

  const changeMemberSettings = useCallback(
    (setting, value) => {
      dispatch(
        updateMemberSettings({
          data: {
            settings: { [setting]: value },
            name: memberStorage.profile.username
          },
          onSuccess: () => toast.success('Settings successfully changed'),
          onError: () => toast.error('Settings did not changed')
        })
      )
    },
    [dispatch, memberStorage.settings]
  )
  const fetchMemberData = useCallback(() => dispatch(fetchData()), [dispatch])

  const fetchMemberProfileData = useCallback(
    (data) => {
      dispatch(fetchProfileData(data))
    },
    [dispatch]
  )

  const changeProfileSubscription = useCallback(
    (data) => {
      dispatch(
        updateProfileSubscription({
          data,
          onSuccess: () => toast.success('Settings successfully changed'),
          onError: () => toast.error('Settings did not changed')
        })
      )
    },
    [dispatch, memberStorage.settings]
  )

  const fetchMemberRaceColumns = useCallback(
    (data) => {
      dispatch(fetchRaceColumns(data))
    },
    [dispatch]
  )

  return {
    memberStorage,
    changeMemberSettings,
    fetchMemberData,
    fetchMemberRaceColumns,
    fetchMemberProfileData,
    changeProfileSubscription,
    isLoading: memberStorage.isLoading
  }
}

export default useMemberStore
