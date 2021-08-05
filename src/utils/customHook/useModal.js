import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useMemo } from 'react'
import { toggleModal } from '@store/ui/actions'

const useModal = (type) => {
  const dispatch = useDispatch()

  const modalStorage = useSelector(store => store.ui)

  const isOpen = useMemo(
    () => modalStorage.openModals.includes(type),
    [modalStorage.openModals]
  )
  const toggleModalState = useCallback(
    () => {
      dispatch(toggleModal(type))
    }
    ,
    []
  )

  return [isOpen, toggleModalState]
}

export default useModal
