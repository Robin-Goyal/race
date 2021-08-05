import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

const SaveSignInDialog = ({ isOpen, fullScreen = false, handleClose }) => (
  <>
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      aria-labelledby="responsive-dialog-title"
      maxWidth="xl"
    >
      <DialogTitle id="responsive-dialog-title">
        Another device is signed into this account
      </DialogTitle>
      <DialogContent>
        Another device is signed into this account, would you like to use this
        device instead ?
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            yes
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  </>
)
SaveSignInDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  fullScreen: PropTypes.bool
}
export default SaveSignInDialog
