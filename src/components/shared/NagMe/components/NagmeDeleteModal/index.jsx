import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import PropTypes from 'prop-types'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import { toast } from 'react-toastify'
import { deleteNagme } from '@components/NagMePage/ducks/actions'
import { useDispatch } from 'react-redux'
import helpers from '@utils/helpers'
import Logger from '@utils/logger'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

const NagmeDeleteModal = ({ isOpen, fullScreen, handleClose, nagme }) => {
  const [isLoading, toggleIsLoading] = useState(false)
  const dispatch = useDispatch()

  const handleDeleteSubmit = (data, onSuccess, onError) => {
    dispatch(
      deleteNagme({
        data,
        onSuccess,
        onError
      })
    )
  }
  const submitDelete = async () => {
    try {
      handleDeleteSubmit(
        {
          id: nagme.id
        },
        () => {
          toggleIsLoading(false)
          toast.success('NagMe successfully deleted')
          handleClose()
        },
        (error) => {
          toggleIsLoading(false)
          helpers.handleFormErrors(error, toast.error)
          toast.error(`Something wrong, Nagme has not been deleted`)
        }
      )
    } catch (error) {
      Logger.log(error)
    }
  }
  const classes = useStyles()

  if (!nagme) return null
  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Confirm your action
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete nagme for {nagme.name}?
        </DialogContentText>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submitDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </DialogContent>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="primary" disableShrink />
      </Backdrop>
    </Dialog>
  )
}
NagmeDeleteModal.propTypes = {
  fullScreen: PropTypes.any,
  nagme: PropTypes.any,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func.isRequired
}
export default NagmeDeleteModal
