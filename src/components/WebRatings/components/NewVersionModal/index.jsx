/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import { useTheme } from '@material-ui/core'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Storage from '@utils/storage'
import PropTypes from 'prop-types'
import { fade } from '@material-ui/core/styles/colorManipulator'

const NewVersionModal = ({ isOpen, handleClose }) => {
  const handleDontShow = () => {
    Storage.set('rtr-new-version-popup', 1)
    handleClose()
  }
  const theme = useTheme()

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      maxWidth="md"
      PaperProps={{
        style: { maxWidth: 620 }
      }}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogTitle id="responsive-dialog-title">Warning!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This is the NEW version of the WebRatings. The old version of
          RatingTheRaces is available for 1 more week.
        </DialogContentText>
        <div
          style={{
            marginTop: 20,
            backgroundColor: fade(theme.palette.primary.light, 0.1),
            padding: 15,
            borderRadius: 5
          }}
        >
          <DialogContentText>
            Please note: All NAPs and Selections and NagMe's MUST now be
            submitted on this new version to count. The Reserve in the NAP
            Competition has been replaced with a 3B and will now be counting
            towards the weekly competition as well.
          </DialogContentText>
        </div>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            href="https://web.ratingtheraces.com/races/"
          >
            Go to OLD WebRatings
          </Button>
          <Button variant="contained" onClick={handleDontShow} color="primary">
            Continue to NEW version
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

NewVersionModal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func.isRequired
}
export default NewVersionModal
