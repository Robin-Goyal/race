import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

const SelectionConfirmationModal = ({
  isOpen,
  handleClose,
  handleSelectionConfirmation
}) => {
  const classes = useStyles()
  const [isLoading, setLoading] = useState(false)

  const handleSelection = (status) => {
    setLoading(true)
    handleSelectionConfirmation(status)
  }

  return (
    <Dialog
      fullWidth
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      maxWidth="md"
      PaperProps={{
        style: { maxWidth: 600 }
      }}
    >
      <DialogTitle id="responsive-dialog-title">Add selections</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This is going to create a new selection group
        </DialogContentText>
        <DialogContentText>
          Do you want to continue with previously selected horses as well?
        </DialogContentText>
        <DialogActions>
          <Button
            onClick={() => handleSelection(false)}
            color="primary"
            variant="contained"
            disabled={isLoading}
          >
            No
          </Button>
          <Button
            onClick={() => handleSelection(true)}
            color="primary"
            variant="contained"
            disabled={isLoading}
          >
            Yes
          </Button>
        </DialogActions>
      </DialogContent>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="primary" disableShrink />
      </Backdrop>
    </Dialog>
  )
}
SelectionConfirmationModal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleSelectionConfirmation: PropTypes.func.isRequired
}
export default SelectionConfirmationModal
