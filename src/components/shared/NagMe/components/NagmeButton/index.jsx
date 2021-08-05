import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import helpers from '@utils/helpers'
import IconButton from '@material-ui/core/IconButton'
import CreateIcon from '@material-ui/icons/Create'
import { toggleModal } from '@store/ui/actions'
import { setItemData } from '@store/nagmeGlobalStore/actions'
import { MODALS_LIST } from '@constants/common'

const NagmeButton = ({ data, horse, run_id }) => {
  const nagData = helpers.transformNagme(data, horse, run_id)
  const dispatch = useDispatch()
  const handleOpenModal = () => {
    dispatch(setItemData(nagData))
    if (nagData && nagData.id) {
      dispatch(toggleModal(MODALS_LIST.NAGME_UPDATE_MODAL))
    } else {
      dispatch(toggleModal(MODALS_LIST.NAGME_CREATING_MODAL))
    }
  }

  return (
    <div>
      <IconButton onClick={() => handleOpenModal()} style={{ padding: 5 }}>
        <CreateIcon
          style={{
            color: nagData && nagData.id ? '#FFBB00' : '#57575f',
            width: 20,
            height: 20
          }}
        />
      </IconButton>
    </div>
  )
}
NagmeButton.propTypes = {
  data: PropTypes.shape({}),
  horse: PropTypes.shape({}),
  run_id: PropTypes.number
}
export default memo(NagmeButton)
