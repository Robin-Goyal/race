import React from 'react'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import './index.scss'

const NagmeTopSection = ({ nagmeCount, nagmeTotalCount, handleOpenModal }) => (
  <>
    <Typography
      className="nagme-heading"
      variant="h3"
      component="h1"
      paragraph={true}
    >
      My NagMes ({nagmeCount} out of {nagmeTotalCount})
      <IconButton
        onClick={handleOpenModal}
        style={{ padding: 5, marginLeft: 10 }}
        disabled={nagmeCount === nagmeTotalCount}
      >
        <AddCircleOutlineIcon />
      </IconButton>
    </Typography>
  </>
)
NagmeTopSection.propTypes = {
  nagmeCount: PropTypes.number.isRequired,
  nagmeTotalCount: PropTypes.number.isRequired,
  handleOpenModal: PropTypes.func.isRequired
}
export default NagmeTopSection
