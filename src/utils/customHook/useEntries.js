import { useDispatch, useSelector } from 'react-redux'
import {
  addNap,
  clearEntries,
  fetchNapsData,
  submitNaps
} from '@components/WebRatings/ducks/actions'
import dateConversations from '@utils/timeUtils'
import { toast } from 'react-toastify'
import isNil from 'lodash/isNil'

const useEntries = () => {
  const dispatch = useDispatch()

  const entryStorage = useSelector((store) => store.races)

  const createEntry = (date, entryType, runId) => {
    const napDate = dateConversations.getFormattedDate(date)
    const requestedTime = dateConversations.getTimeStamp()
    dispatch(
      addNap({
        date: napDate,
        requestBody: {
          entry_type: entryType,
          id: runId,
          requested_at: requestedTime
        },
        onSuccess: () => ({}),
        onError: (e) => toast.error(`Error: ${e}`)
      })
    )
  }
  const getEntryType = (id) => {
    if (!entryStorage || !entryStorage.entry) return ''
    const { entry } = entryStorage
    if (entry.nap && Number(entry.nap) === Number(id)) {
      return {
        value: 'nap',
        label: 'NAP'
      }
    } else if (entry.nb && Number(entry.nb) === Number(id)) {
      return {
        value: 'nb',
        label: 'NB'
      }
    } else if (entry.reserve && Number(entry.reserve) === Number(id)) {
      return {
        value: 'reserve',
        label: '3B'
      }
    } else {
      return ''
    }
  }
  const clearEntriesData = (date, modalClose) => {
    const napDate = dateConversations.getFormattedDate(date)
    const requestedTime = dateConversations.getTimeStamp()
    dispatch(
      clearEntries({
        date: napDate,
        requestBody: {
          nap: '',
          nb: '',
          reserve: '',
          requested_at: requestedTime
        },
        onSuccess: () => {
          toast.success('Entry successfully cleared')
          modalClose && modalClose()
        },
        onError: (e) => toast.error(`Error: ${e.message}`)
      })
    )
  }
  const fetchNapDetails = (date, isEntrySubmitted, onSuccess, onError) => {
    const napDate = dateConversations.getFormattedDate(date)
    dispatch(
      fetchNapsData({
        date: napDate,
        isEntrySubmitted,
        onSuccess,
        onError
      })
    )
  }
  const getDetailInfo = () => {
    if (isNil(entryStorage.napsDetailInfo)) {
      return []
    } else {
      return [
        {
          id: 'NAP',
          checkName: 'bfsp_nap',
          data: entryStorage.napsDetailInfo.entry.nap || {},
          force_bfsp: entryStorage.napsDetailInfo.force_bfsp
        },
        {
          id: 'NB',
          checkName: 'bfsp_nb',
          data: entryStorage.napsDetailInfo.entry.nb || {},
          force_bfsp: entryStorage.napsDetailInfo.force_bfsp
        },
        {
          id: '3B',
          checkName: 'bfsp_reserve',
          data: entryStorage.napsDetailInfo.entry.reserve || {},
          force_bfsp: entryStorage.napsDetailInfo.force_bfsp
        }
      ]
    }
  }

  const isAlreadyNaped = () => {
    if (isNil(entryStorage.napsDetailInfo)) {
      return false
    } else {
      return !entryStorage.napsDetailInfo.entering
    }
  }

  const getNapsDetailInfo = () => entryStorage.napsDetailInfo

  const enterNaps = (naps) => {
    dispatch(submitNaps(naps))
  }
  return {
    getEntryType,
    createEntry,
    clearEntriesData,
    fetchNapDetails,
    getDetailInfo,
    getNapsDetailInfo,
    enterNaps,
    isAlreadyNaped
  }
}

export default useEntries
