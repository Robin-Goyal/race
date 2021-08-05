/* eslint-disable react/prop-types */
import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'
import { toast } from 'react-toastify'
import { Formik, Form } from 'formik'
import FormikField from '@components/shared/FormikField'
import Typography from '@material-ui/core/Typography'
import { NUMBER_OF_RACES_SELECT_OPTIONS } from '@constants/nagmeConstants'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import Tooltip from '@material-ui/core/Tooltip'
import FormErrorMessage from '@components/shared/Form/FormErrorMessage'
import { useDispatch, useSelector } from 'react-redux'
import '../NagmeCreateModal/index.scss'
import helpers from '@utils/helpers'
import { updateNagme } from '@components/NagMePage/ducks/actions'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  typographyRoot: {
    flex: '1 0 100%'
  }
}))

const NagmeUpdateModal = ({
  isOpen,
  fullScreen,
  handleClose,
  noteMaxLength,
  handleNagmeInRaces
}) => {
  const classes = useStyles()
  const [isLoading, setLoading] = useState(false)
  const { data } = useSelector((store) => store.nagmeGlobal)
  const dispatch = useDispatch()

  const handleSubmit = (data, onSuccess, onError) => {
    dispatch(
      updateNagme({
        data,
        onSuccess,
        onError
      })
    )
  }
  const setSelectedRunsNumber = useCallback(
    () =>
      data.auto_delete
        ? NUMBER_OF_RACES_SELECT_OPTIONS.filter(
            (runsOption) => runsOption.value === data.auto_delete
          )[0]
        : NUMBER_OF_RACES_SELECT_OPTIONS[0],
    [data]
  )

  const getModalTitle = () => {
    if (data.horse) {
      return `Update nagme for ${data.horse.name}`
    }
  }
  if (!data) return null
  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        aria-labelledby="responsive-dialog-title"
        maxWidth="xl"
      >
        <DialogTitle id="responsive-dialog-title">
          {getModalTitle()}
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              notes: data.note || '',
              selectedRunsNumber: setSelectedRunsNumber(),
              horse: data.horse || null
            }}
            validationSchema={Yup.object().shape({
              notes: Yup.string().max(
                noteMaxLength || 200,
                `Notes must be at most ${noteMaxLength || 200} characters`
              ),
              horse: Yup.object()
                .shape({})
                .typeError('You need to select horse'),
              selectedRunsNumber: Yup.object().shape({
                label: Yup.string().required(),
                value: Yup.string().required()
              })
            })}
            onSubmit={async (
              { notes, selectedRunsNumber },
              { setSubmitting, setErrors }
            ) => {
              setLoading(true)
              handleSubmit(
                {
                  id: data.id,
                  'auto-delete': selectedRunsNumber.value,
                  note: notes
                },
                (res) => {
                  handleNagmeInRaces && handleNagmeInRaces(res, data.run_id)
                  setSubmitting(false)
                  setLoading(false)
                  handleClose()
                  toast.success('NagMe successfully updated')
                },
                (error) => {
                  setErrors(error)
                  setSubmitting(false)
                  setLoading(false)
                  helpers.handleFormErrors(error, toast.error)
                }
              )
            }}
          >
            {({ errors, values }) => (
              <Form>
                <div>
                  <FormikField
                    name="notes"
                    type="textarea"
                    placeholder="Notes"
                    label="Notes"
                    error={!!errors.notes}
                    rows="5"
                    inputProps={{ maxLength: noteMaxLength || 200 }}
                  />
                  <Typography align="left">
                    Number of characters left:{' '}
                    {helpers.calcRemainingSpace(
                      values.notes.length,
                      noteMaxLength
                    )}
                  </Typography>
                  <FormErrorMessage name="notes" />
                </div>
                <div className="nagme-modal__selected-runs">
                  <Typography
                    classes={{
                      root: classes.typographyRoot
                    }}
                  >
                    Number of races to auto-delete after:
                  </Typography>
                  <FormikField
                    options={NUMBER_OF_RACES_SELECT_OPTIONS}
                    name="selectedRunsNumber"
                    type="formikSelect"
                    placeholder="Never"
                    label="Number of races to auto-delete after:"
                    isLoading={false}
                    isClearable={false}
                    isSearchable={false}
                  />
                  <Tooltip
                    title="Remove the horse from NagMe list after a selected number of successful runs"
                    aria-label="about selected runs"
                  >
                    <HelpOutlineIcon />
                  </Tooltip>
                </div>
                {errors.non_field_errors && (
                  <FormErrorMessage name="non_field_errors" />
                )}
                <DialogActions>
                  <Button type="submit" color="primary" disabled={isLoading}>
                    Update
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
NagmeUpdateModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleNagmeInRaces: PropTypes.func,
  noteMaxLength: PropTypes.number
}
export default NagmeUpdateModal
