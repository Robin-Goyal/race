import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import PropTypes from 'prop-types'

const FilterApplyModal = ({
  isOpen,
  message,
  type,
  fullScreen,
  handleClose,
  handleFilterApply
}) => {
  if (!message || !type) {
    return null
  }
  return (
    <Dialog
      fullWidth
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      maxWidth="md"
      PaperProps={{
        style: { maxWidth: 600 }
      }}
    >
      <DialogTitle id="responsive-dialog-title">
        Apply stats data filters to races
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
        <DialogActions>
          <Button
            onClick={() => handleFilterApply(type, 'replace')}
            color="primary"
            variant="contained"
          >
            Replace
          </Button>
          <Button
            onClick={() => handleFilterApply(type, 'merge')}
            color="primary"
            variant="contained"
          >
            Merge
          </Button>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}
FilterApplyModal.propTypes = {
  fullScreen: PropTypes.any,
  isOpen: PropTypes.bool,
  message: PropTypes.string,
  type: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  handleFilterApply: PropTypes.func.isRequired
}
export default FilterApplyModal
