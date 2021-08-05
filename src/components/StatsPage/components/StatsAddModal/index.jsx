import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import { toast } from 'react-toastify'
import { addStat } from '@components/StatsPage/ducks/actions'
import { useDispatch } from 'react-redux'
import helpers from '@utils/helpers'
import { Formik, Form } from 'formik'
import FormikField from '@components/shared/FormikField'
import FormErrorMessage from '@components/shared/Form/FormErrorMessage'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

const StatsAddModal = ({ isOpen, fullScreen, handleClose, currentFilters }) => {
  const [isLoading, toggleIsLoading] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = (data, onSuccess, onError) => {
    dispatch(
      addStat({
        data,
        onSuccess,
        onError
      })
    )
  }

  const classes = useStyles()

  if (!currentFilters) return null

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Add filter set</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Create a filter set, based on the current filters.
        </DialogContentText>
        <Formik
          initialValues={{
            name: ''
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required()
          })}
          onSubmit={async ({ name }, { setSubmitting, setErrors }) => {
            toggleIsLoading(true)
            handleSubmit(
              {
                name: name,
                filters: currentFilters
              },
              () => {
                setSubmitting(false)
                toggleIsLoading(false)
                toast.success('Data filter set successfully created')
                handleClose()
              },
              (error) => {
                setErrors(error)
                setSubmitting(false)
                toggleIsLoading(false)
                helpers.handleFormErrors(error, toast.error)
              }
            )
          }}
        >
          {({ errors }) => (
            <Form>
              <div>
                <FormikField
                  name="name"
                  type="text"
                  placeholder="Name of filter set"
                  label="Name"
                  error={!!errors.name}
                />
                <FormErrorMessage name="name" />
              </div>
              {errors.non_field_errors && (
                <FormErrorMessage name="non_field_errors" />
              )}
              <DialogActions>
                <Button type="submit" color="primary" disabled={isLoading}>
                  Add
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
  )
}
StatsAddModal.propTypes = {
  fullScreen: PropTypes.any,
  currentFilters: PropTypes.array,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func.isRequired
}
export default StatsAddModal
