import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Storage from '@utils/storage'
import PropTypes from 'prop-types'

const AdvancedRatingModal = ({ isOpen, handleClose }) => {
  const handleDontShow = () => {
    Storage.set('rtr-advanced-rating-popup', 1)
    handleClose()
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Warning!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please note, these advance ratings are subject to change at the Final
          Declaration stage
        </DialogContentText>
        <DialogActions>
          <Button variant="contained" onClick={handleDontShow} color="primary">
            Do not show me this again
          </Button>
          <Button variant="outlined" onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

AdvancedRatingModal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func.isRequired
}
export default AdvancedRatingModal
