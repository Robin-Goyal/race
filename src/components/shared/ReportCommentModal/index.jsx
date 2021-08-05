import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import { Form, Formik } from 'formik'
import FormikField from '@components/shared/FormikField'
import FormErrorMessage from '@components/shared/Form/FormErrorMessage'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

const useReportCommentModalStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

const ReportCommentModal = ({
  isOpen,
  handleClose,
  comment,
  handleReportComment
}) => {
  const ReportFormSchema = Yup.object().shape({
    message: Yup.string().required()
  })
  const classes = useReportCommentModalStyles()
  const [isLoading, setLoading] = useState(false)

  return (
    <>
      <Dialog
        fullWidth
        open={isOpen}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          style: { maxWidth: 768 }
        }}
      >
        <DialogTitle id="responsive-dialog-title">Report Comment</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              message: ''
            }}
            validationSchema={ReportFormSchema}
            onSubmit={(values) => {
              setLoading(true)
              handleReportComment({
                value: values && values.message,
                comment: comment,
                onSuccess: () => {
                  toast.success('Comment has been successfully reported')
                  setLoading(false)
                  handleClose()
                },
                onError: (e) => {
                  const message = e.message || e
                  toast.error(message)
                  setLoading(false)
                }
              })
            }}
          >
            {({ errors }) => (
              <Form>
                <div>
                  <FormikField
                    name="message"
                    type="textarea"
                    placeholder="You are about to report this comment as being inappropriate. Please explain why you are flagging this comment and submit your report. The site administrator will be notified. Thank you for your input."
                    rows="3"
                    error={!!errors.message}
                  />
                  <FormErrorMessage name="message" />
                </div>
                {errors.non_field_errors && (
                  <FormErrorMessage name="non_field_errors" />
                )}
                <DialogActions>
                  <Button type="submit" color="primary" disabled={isLoading}>
                    Submit
                  </Button>
                  <Button
                    onClick={handleClose}
                    color="primary"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                </DialogActions>
                <Backdrop className={classes.backdrop} open={isLoading}>
                  <CircularProgress color="primary" disableShrink />
                </Backdrop>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  )
}

ReportCommentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleReportComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired
}

export default ReportCommentModal
