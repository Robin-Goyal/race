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
import { deleteStat } from '@components/StatsPage/ducks/actions'
import { useDispatch } from 'react-redux'
import helpers from '@utils/helpers'
import Logger from '@utils/logger'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

const StatsDeleteModal = ({
  isOpen,
  fullScreen,
  handleClose,
  stat,
  currentStatsType
}) => {
  const [isLoading, toggleIsLoading] = useState(false)
  const dispatch = useDispatch()

  const handleDeleteSubmit = (data, onSuccess, onError) => {
    dispatch(
      deleteStat({
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
          name: stat,
          type: currentStatsType && currentStatsType.value
        },
        () => {
          toggleIsLoading(false)
          toast.success('Data filter set successfully deleted')
          handleClose()
        },
        (error) => {
          toggleIsLoading(false)
          helpers.handleFormErrors(error, toast.error)
          toast.error(`Something wrong, Data filter set has not been deleted`)
        }
      )
    } catch (error) {
      Logger.log(error)
    }
  }
  const classes = useStyles()

  if (!stat) return null
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
          Are you sure you want to delete data filter set named {stat}?
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
StatsDeleteModal.propTypes = {
  fullScreen: PropTypes.any,
  stat: PropTypes.string,
  currentStatsType: PropTypes.object,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func.isRequired
}
export default StatsDeleteModal
